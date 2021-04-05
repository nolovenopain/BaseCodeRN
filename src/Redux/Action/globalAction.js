export const forceUpdateGlobal = (obj, isSaveLocalStore) => {
    isSaveLocalStore = isSaveLocalStore == null ? false : isSaveLocalStore;
    return { 
        type: 'forceUpdateGlobal', 
        obj, 
        isSaveLocalStore 
    };
}
export const toggleLoading = (flag) => { 
    return { 
        type: 'toggleLoading', 
        flag 
    };
}

export const checkInternetConnection = (status) => {
    return { 
        type: 'checkInternetConnection', 
        status 
    };
}