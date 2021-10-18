import React from 'react';
import deviceInfoModule from "react-native-device-info"
import { badRequest, notFound, notPermission, otherError, serverError, sessionExpired } from "../Utils/errors"
import appConfig from '../../app.json'
import { Alert, Linking, PermissionsAndroid, Platform, ToastAndroid } from "react-native"
import TextCus from '../ViewCustom/textCustom'
import { Dimensions } from "../Constants"
import LocalStorage from '../Utils/localStorage';
import { login } from '../APIs/api';
import AlertCus from '../ViewCustom/alertCustom';
import { updateUser } from '../Utils/extends';

export const hasNotch = () => {
    return deviceInfoModule.hasNotch()
}

export const noDataView = () => {
    return (
        <TextCus 
            style={{
                fontFamily: TextCus.FontCustom.Roboto_Regular,
                color: 'gray',
                fontSize: 20,
                marginTop: Dimensions.height / 5
            }} 
        >
            Không có dữ liệu
        </TextCus>
    )
}

export const checkStatus = async(res) => {  
    var data = null
    switch (res.status) {
        case 200:
            const resp = await res.json();
            data = resp.Data
            if(data) {
                if(resp.code == 200) {
                    data = resp.Data
                }
                else if(resp.code == 204) {
                    console.log(resp)
                }
            }
            else {
                data = resp
            }
            break;
        case 401:
            sessionExpired()
            break;
        case 400: 
            badRequest()
            break;
        case 403: 
            notPermission()
            break;
        case 404: 
            notFound()
            break;
        case 500: 
            serverError()
            break;
        default:
            otherError()
            break;
    }
    return data
}

// export const openSetting = async() => {
//     await Linking.openSettings()
//     .catch(() => {
//         Alert.alert('Unable to open settings');
//     });
// };

// export const turnOnSetting = () => {
//     Alert.alert(
//         `Bật dịch vụ định vị định vị "${appConfig.displayName}" để cho phép xác định vị trí của bạn.`,
//         '',
//         [
//             { text: 'Cài đặt', onPress: openSetting },
//             { text: "Không sử dụng định vị", onPress: () => {} },
//         ],
//     );
// }

// export const hasPermissionIOS = async () => {
    
//     const status = await Geolocation.requestAuthorization('whenInUse');

//     if (status === 'granted') {
//         return true;
//     }

//     if (status === 'denied') {
//         Alert.alert('Quyền truy cập vị trí bị từ chối');
//     }

//     if (status === 'disabled') {
//         turnOnSetting
//     }

//     return false;
// };

// export const hasLocationPermission = async () => { 
//     //check on IOS
//     if (Platform.OS === 'ios') {
//         const hasPermission = await hasPermissionIOS();
//         return hasPermission;
//     }

//     // check on Android
//     if (Platform.OS === 'android' && Platform.Version < 23) {
//         return true;
//     }

//     const hasPermission = await PermissionsAndroid.check(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (hasPermission) {
//         return true;
//     }

//     const status = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     );

//     if (status === PermissionsAndroid.RESULTS.GRANTED) {
//         return true;
//     }

//     if (status === PermissionsAndroid.RESULTS.DENIED) {
//         ToastAndroid.show(
//             'Người dùng từ chối truy cập vị trí',
//             ToastAndroid.LONG,
//         );
//     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
//         ToastAndroid.show(
//             'Quyền truy cập vị trí bị thu hồi bởi người dùng',
//             ToastAndroid.LONG,
//         );
//     }

//     return false;
// };

export const autoLogin = async() => {
    const deviceInfo = await LocalStorage.getDeviceInfo();
    const deviceToken = await LocalStorage.getDeviceToken();
    const user = await LocalStorage.getUserSaved();
    try {
        const res = await login(
            user.user.Username,
            user.user.Password,
            deviceInfo.system_name,
            deviceInfo.manufacture,
            deviceInfo.device_model,
            deviceToken
        )
        const resp = await checkStatus(res);
        if(resp.user) {
            resp.user.Password = user.user.Password;
            updateUser(resp, true)
        }
        else {
            Alert.alert('Lỗi', resp.Message)
        }
    } catch (error) {
        console.log(error)
        otherError()
    }
}

export const noInternetConnection = () => {
    AlertCus.Alert('Lỗi', 'global.noInternetConnection')
}