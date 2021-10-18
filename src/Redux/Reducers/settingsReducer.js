import LocalStorage from '../../Utils/localStorage';

export let defaultStateSettings = {
    "language": 'viVN',
}

export default settingsReducer = (state = defaultStateSettings, action) => {
    switch (action.type) {
        case 'forceUpdateSettings': 
            var _state = {
                ...state,
                ...(action.obj || {})
            }
            if(action.flagSave) {
                LocalStorage.setSettings(_state);
            }
            return _state
        default:
            return state
    }
}