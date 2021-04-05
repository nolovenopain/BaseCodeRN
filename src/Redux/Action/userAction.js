export const forceUpdateUser = (obj, isSaveLocalStore) => {
    isSaveLocalStore = (isSaveLocalStore == null ? false : isSaveLocalStore);
    return { 
        type: 'forceUpdateUser', 
        obj, 
        isSaveLocalStore 
    };
}