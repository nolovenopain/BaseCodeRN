import LocalStorage from '../../Utils/localStorage';

export let defaultStateSettings = {
    language: 'vi',
}

export default settingsReducer = (state = defaultStateSettings, action) => {
    switch (action.type) {
        case 'forceUpdateSettings': 
            var _state = {
                ...state,
                language: action.lang
            }
            if(action.flagSave) {
                LocalStorage.setSettings(_state);
            }
            return _state
        default:
            return state
    }
}