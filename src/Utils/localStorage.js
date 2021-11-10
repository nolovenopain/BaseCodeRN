import AsyncStorage from '@react-native-community/async-storage';
import { defaultStateUser } from '../Redux/Reducers/userReducer';
import { defaultStateSettings } from '../Redux/Reducers/settingsReducer';

const SETTINGS = 'SETTINGS';
const USER_SAVED = 'USER_SAVED';
const FCM_TOKEN = 'FCM_TOKEN';
const DEVICE_INFO = 'DEVICE_INFO';

var LocalStorage = {
    getItems: async function (keys) {
        keys = keys || []
        try {
            var obj = {};
            for (let i = 0; i < keys.length; i++) {
                const e = keys[i];
                let item = await AsyncStorage.getItem(e.key);
                obj[e.key] = item == null ? e.default : item;
            }
            // return JSON.parse(item);
            return obj
        } catch (ex) {
            return _default;
        }
    },
    getItem: async function (key, _default) {
        try {
            let item = await AsyncStorage.getItem(key);
            // return JSON.parse(item);
            return item == null ? _default : item;
        } catch (ex) {
            return _default;
        }
    },
    setItem: async function (key, value) {
        return await AsyncStorage.setItem(key, value);
    },
    removeItem: async function (key) {
        return await AsyncStorage.removeItem(key);
    },
    setUserSaved: (obj) => {
        LocalStorage.setItem(USER_SAVED, JSON.stringify(obj || defaultStateUser))
            .then(value => {
                console.log(value);
            });
    },
    getUserSaved: async () => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(USER_SAVED, '{}')
                .then(value => { 
                    var userSaved = {
                        ...defaultStateUser,
                        ...(JSON.parse(value))
                    };  
                    resolve(userSaved)
                });
        })
    },
    setDeviceToken: (token) => {
        LocalStorage.setItem(FCM_TOKEN, token || '')
    },
    getDeviceToken: async() => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(FCM_TOKEN, '')
                .then(value => {
                    resolve(value);
                });
        })
    },
    setDeviceInfo: () => {
        LocalStorage.setItem(DEVICE_INFO, JSON.stringify(obj))
            .then(value => {
                console.log(value);
            });
    },
    getDeviceInfo: async() => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(DEVICE_INFO, '{}')
                .then(value => {
                    var deviceInfo = {
                        ...{},
                        ...(JSON.parse(value))
                    };
                    resolve(deviceInfo);
                });
        })
    },
    setSettings: (obj) => {
        LocalStorage.setItem(SETTINGS, JSON.stringify(obj))
            .then(value => {
                console.log(obj);
            });
    },
    getSettings: async() => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(SETTINGS, '{}')
                .then(value => {
                    var settings = {
                        ...defaultStateSettings,
                        ...(JSON.parse(value))
                    };
                    resolve(settings);
                });
        })
    },
    getDataSave: async() => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItems([
                {
                    key: USER_SAVED,
                    default: '{}'
                },
                {
                    key: SETTINGS,
                    default: '{}'
                },
            ]).then(data => {
                var userSaved = {
                    defaultStateUser,
                    ...(JSON.parse(data[USER_SAVED]))
                };
                var settings = {
                    ...defaultStateSettings,
                    ...(JSON.parse(data[SETTINGS]))
                };
                resolve({
                    userSaved,
                    settings,
                });
            })
        });
    }
}

export default LocalStorage;
