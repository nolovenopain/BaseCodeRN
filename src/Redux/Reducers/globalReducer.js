export let defaultStateGlobal = {
    loadingTitle: null,
    isLoading: false,
    isInternetConnected: true,
    currentCoords: {
        latitude: null,
        longitude: null
    },
    currentLocation: {},
    toggleRefreshHome: false
}

export default globalReducer = (state = defaultStateGlobal, action) => { 
    switch(action.type) {
        case 'forceUpdateGlobal':
            return {
                ...state,
                ...(action.obj || {})
            }
        case 'toggleLoading':
            var flag = action.flag === null ? !state.isLoading : action.flag
            return {
                ...state,
                isLoading: flag,
                loadingTitle: action.loadingTitle
            }
        case 'checkInternetConnection': 
            return {
                ...state,
                isInternetConnected: action.status
            }
        case 'updateCurrentCoords':
            return {
                ...state,
                currentCoords: action.coords
            }
        case 'updateCurrentLocation':
            return {
                ...state,
                currentLocation: action.location
            }
        case 'refreshHomeAfterReceiveNoti':
            return {
                ...state,
                toggleRefreshHome: !defaultStateGlobal.toggleRefreshHome
            }
        default:
            return state
    }
}