import { Alert as AlertRN } from 'react-native';
import { translate } from '../Language/index';
import store from '../Redux/Store/store';

let AlertCus = {
    Confirm: (callback, mess, title, cancelPress, textButtonCancel, textButtonOK, textAskMe, askMePress) => {
        AlertRN.alert(
            title || 'Thông báo',
            mess || 'Bạn có muốn xóa?',
            (
                textAskMe != null ? 
                [
                    {
                        text: textAskMe || 'Nhắc tôi sau',
                        onPress: () => {
                            if (askMePress) askMePress();
                        }
                    }
                ] :
                    []
            ).concat([
                {
                    text: textButtonCancel || 'Hủy',
                    onPress: () => {
                        if (cancelPress) cancelPress();
                    },
                    style: 'cancel',
                },
                {
                    text: textButtonOK || 'Đồng ý',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ]),
            { cancelable: false },
        );
    },
    Alert: (title, mess, callback) => {
        AlertRN.alert(
            title || 'Thông báo',
            mess ? translate(mess, store.getState().settings.language) : 'Có lỗi xẩy ra, vui lòng thử lại.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        if (callback) callback();
                    }
                },
            ],
            { cancelable: false }
        );
    }
}

export default AlertCus;