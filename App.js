/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { Component } from 'react';
 import { StatusBar, LogBox, ActivityIndicator } from 'react-native';
 import { Provider } from 'react-redux';
 import RootComponent from './src/RootComponent';
 import store from './src/Redux/Store/store';
 import SplashScreen from 'react-native-splash-screen'
 import LocalStorage from './src/Utils/localStorage';
 import { forceUpdateSettings } from './src/Redux/Action/settingsAction';
 
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
        SplashScreen.hide();
        
        var save = await LocalStorage.getDataSave()
        store.dispatch(forceUpdateSettings(save.settings))

        this.setState({ isReady: true })

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
 
 