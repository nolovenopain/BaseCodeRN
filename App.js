/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StatusBar, LogBox, ActivityIndicator, Alert, Platform } from 'react-native';
import { Provider } from 'react-redux';
import RootComponent from './src/RootComponent';
import store from './src/Redux/Store/store';
import SplashScreen from 'react-native-splash-screen'
import LocalStorage from './src/Utils/localStorage';
import { fcmService } from './src/FCMService';
import { localNotificationService } from './src/LocalNotificationService';
import { navigate } from './src/Navigators/rootNavigation';
  
LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
 
export default class App extends Component {
   
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            isReady: true
        };
    }

    async componentDidMount() {
        this._isMounted = true
        if(this._isMounted) {
            SplashScreen.hide();

            this.setState({ isReady: true })
            
            var save = await LocalStorage.getDataSave()
            store.dispatch(forceUpdateSettings(save.settings))

            fcmService.registerAppWithFCM()
            localNotificationService.createChannel()
            fcmService.register(this.onRegister, this.onNotification, this.onOpenDefaultNotification)
            this.handleNotificationOpen = localNotificationService.configure(this.onOpenLocalNotification)

            return () => {
                console.log("[App] unRegister");
                fcmService.unRegister()
                localNotificationService.unregister()
            }
        }
    }

    onRegister = async(token) => { 
        console.log("[App] onRegister: ", token);
        await LocalStorage.setDeviceToken(token)
    }

    onNotification = notify => {
        console.log("[App] onNotification: ", notify);
        const options = {
            soundName: 'default',
            playSound: true
        }
        localNotificationService.showNotification(
            0,
            notify.notification.title,
            notify.notification.body,
            notify,
            options
        )
    }

    onOpenDefaultNotification = notify => {
        console.log("[App] onOpenDefaultNotification: ", notify);
    }

    onOpenLocalNotification = async(notify) => {
        console.log("[App] onOpenLocalNotification: ", notify);
        const message_id = notify.data.messageId ? notify.data.messageId : notify.data.item ? notify.data.item.messageId : notify.data["gcm.message_id"]
        localNotificationService.removeDeliveriedNotificationByID(message_id)

        const typeNoti = notify.data.type ? notify.data.type : notify.data.item.type
        const warningId = notify.data.notification_id ? notify.data.notification_id : notify.data.item.data.notification_id
        // navigate( typeNoti === 'warning_disaster' ? 'CalamityWarningDetails' : 'ThresholdWarningDetails', { 
        //     warningId,
        //     type: 'fromNoti' 
        // })

        // const typeNumber = typeNoti === 'warning_disaster' ? 2 : 1
        // await this.updateStateNoti(warningId, typeNumber)
    }
 
    render() {
        return (
            <Provider store={store}>
                <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
                {this.state.isReady ?
                    <RootComponent/>
                        :
                    <View
						style={{
							flex: 1,
							backgroundColor: 'rgba(0,0,0,.1)',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<ActivityIndicator color='white' size={'large'} />
					</View>
                }
            </Provider>
        );
    }  
 }
 
 