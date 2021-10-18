export const forceUpdateSettings = (obj, flagSave) => {
    flagSave = flagSave == null ? false : flagSave;
    return { 
        type: 'forceUpdateSettings', 
        obj, 
        flagSave 
    };
}