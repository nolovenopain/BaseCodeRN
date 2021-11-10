import vi  from './vi-VN'
import en  from './en-US'
import I18n from 'react-native-i18n';

I18n.translations = {
    vi,
    en
};

export const translate = (str, language) => {
    I18n.locale = language
    return I18n.t(str)
}