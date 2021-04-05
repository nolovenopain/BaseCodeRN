import AsyncStorage from '@react-native-community/async-storage';
import { defaultState as defaultStateUser } from '../Redux/Reducers/userReducer';
import { defaultState as defaultStateSettings } from '../Redux/Reducers/settingsReducer';

const SETTINGS = 'SETTINGS';
const USER_SAVED = 'USER_SAVED';
const FCM_TOKEN = 'FCM_TOKEN';

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
    setUserSaved: (obj, callback) => {
        LocalStorage.setItem(USER_SAVED, JSON.stringify(obj || defaultStateUser))
            .then(value => {
                if (callback)
                    callback(value);
            });
    },
    getUserSaved: async (callback) => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(USER_SAVED, '{}')
                .then(value => {
                    var userSaved = {
                        ...defaultStateUser,
                        ...(JSON.parse(value))
                    };  
                    (callback || resolve)(userSaved);
            });
        })
    },
    setSettings:(obj) => {
        LocalStorage.setItem(SETTINGS, JSON.stringify(obj))
            .then(value => {
                if (callback)
                    callback(value);
            });
    },
    getSettings: async(callback) => {
        return new Promise((resolve, reject) => {
            LocalStorage.getItem(SETTINGS, '{}')
                .then(value => {
                    var settings = {
                        ...defaultStateSettings,
                        ...(JSON.parse(value))
                    };
                    (callback || resolve)(settings);
                });
        })
    },
    getDataSave: async (callback) => {
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
                (callback || resolve)({
                    userSaved,
                    settings,
                });
            })
        });
    }
}

export default LocalStorage;
