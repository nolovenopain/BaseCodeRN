import viVN  from './vi-VN'
import enUS  from './en-US'

let language = {
    viVN,
    enUS
}

export default language;

export let translate = (keys, locate) => {
    locate = (locate == null ? 'viVN' : locate);
    keys = keys.split('.');
    var translate = language[locate];
    while (keys.length > 0 && translate != null) {
        translate = translate[keys[0]];
        keys.splice(0, 1);
    }
    return translate;
}