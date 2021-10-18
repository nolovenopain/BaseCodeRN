export const forceUpdateGlobal = (obj, isSaveLocalStore) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return { 
        type: 'forceUpdateGlobal', 
        obj, 
        isSaveLocalStore 
    };
}

export const toggleLoading = (flag, loadingTitle) => { 
    return { 
        type: 'toggleLoading', 
        flag,
        loadingTitle
    };
}

export const checkInternetConnection = status => { 
    return { 
        type: 'checkInternetConnection', 
        status 
    };
}