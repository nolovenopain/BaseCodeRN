export let defaultSate = {
    isLoading: false,
    isInternetConnected: true
}

export default globalReducer = (state = defaultSate, action) => {
    switch(action.type) {
        case 'forceUpdateGlobal':
            return {
                ...state,
                ...(action.obj || {})
            }
        case 'toggleLoading':
            var flag = action.flag == null ? !state.isLoading : action.flag
            return {
                ...state,
                isLoading: flag
            }
        case 'checkInternetConnection':
            return {
                ...state,
                isInternetConnected: action.status
            }
        default:
            return state
    }
}