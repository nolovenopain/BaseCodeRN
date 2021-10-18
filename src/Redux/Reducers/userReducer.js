import LocalStorage from '../../Utils/localStorage';

export let defaultStateUser = {
    user: null,
    token: '',
}

export default userReducer = (state = defaultStateUser, action) => { 
    switch (action.type) {
        case 'forceUpdateUser': 
            var _state = {
                ...state,
                ...(action.obj || {})
            }
            if(action.isSaveLocalStore) {
                LocalStorage.setUserSaved(_state);
            }
            return _state
        default:
            return state
    }
}