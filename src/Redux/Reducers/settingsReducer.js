import LocalStorage from '../../Utils/localStorage';

export let defaultState = {
    "language": 'viVN',
}

export default settingsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'forceUpdateSettings': 
            if(action.flagSave) {
                LocalStorage.setSettings(state);
            }
            return {
                ...state,
                ...(action.obj || {})
            }
        default:
            return state
    }
}