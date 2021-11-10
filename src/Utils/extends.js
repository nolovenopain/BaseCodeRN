import { checkInternetConnection, toggleLoading as toggleLoadingRND } from "../Redux/Action/globalAction";
import { forceUpdateSettings } from "../Redux/Action/settingsAction";
import store from '../Redux/Store/store';
// import { constants } from "./constants";

export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const toggleLoading = (flag) => {
    store.dispatch(toggleLoadingRND(flag));
}

export const updateInternetStatus = bool => {
    store.dispatch(checkInternetConnection(bool))
}

export const changeLanguage = lang => {
    store.dispatch(forceUpdateSettings(lang, true))
}

// export function DropDownAlert(mess, type, header) {
//     constants.dropdownAlertRef.current.alertWithType(type || 'success', header || 'Success', mess);
// }