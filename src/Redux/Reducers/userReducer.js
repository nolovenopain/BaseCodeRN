import { setUserSaved } from '../../Utils/localStorage';

export let defaultState = {
    Token: '',
    User: null
}

export default userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'forceUpdateUser': 
            if(action.isSaveLocalStore) {
                setUserSaved(state);
            }
            return {
                ...state,
                ...(action.obj || {})
            }
        default:
            return state
    }
}