export const forceUpdateSettings = (lang, flagSave) => {
    flagSave = flagSave == null ? false : flagSave;
    return { 
        type: 'forceUpdateSettings', 
        lang, 
        flagSave 
    };
}