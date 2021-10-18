import React from 'react';
import { Text as TextRN, StyleSheet, Platform } from 'react-native';
import { translate } from '../Language/index';
import { connect } from 'react-redux';

export default class TextCus extends React.PureComponent {
    static FontCustom = {
        Arial: Platform.select({
            android: 'arial',
            ios: 'arial'
        }),
        Roboto_Black: Platform.select({
            android: 'Roboto-Black',
            ios: 'Roboto-Black'
        }),
        Roboto_BlackItalic: Platform.select({
            android: 'Roboto-BlackItalic',
            ios: 'Roboto-BlackItalic'
        }),
        Roboto_Bold: Platform.select({
            android: 'Roboto-Bold',
            ios: 'Roboto-Bold'
        }),
        Roboto_BoldItalic: Platform.select({
            android: 'Roboto-BoldItalic',
            ios: 'Roboto-BoldItalic'
        }),
        Roboto_Italic: Platform.select({
            android: 'Roboto-Italic',
            ios: 'Roboto-Italic'
        }),
        Roboto_Light: Platform.select({
            android: 'Roboto-Light',
            ios: 'Roboto-Light'
        }),
        Roboto_LightItalic: Platform.select({
            android: 'Roboto-LightItalic',
            ios: 'Roboto-LightItalic'
        }),
        Roboto_Medium: Platform.select({
            android: 'Roboto-Medium',
            ios: 'Roboto-Medium'
        }),
        Roboto_MediumItalic: Platform.select({
            android: 'Roboto-MediumItalic',
            ios: 'Roboto-MediumItalic'
        }),
        Roboto_Regular: Platform.select({
            android: 'Roboto-Regular',
            ios: 'Roboto-Regular'
        }),
        Roboto_Thin: Platform.select({
            android: 'Roboto-Thin',
            ios: 'Roboto-Thin'
        }),
        Roboto_ThinItalic: Platform.select({
            android: 'Roboto-ThinItalic',
            ios: 'Roboto-ThinItalic'
        }),
        ProximaNovaLg_Black: Platform.select({
            android: 'ProximaNovaLg_Black',
            ios: 'ProximaNova-Black'
        }),
        ProximaNovaLg_BlackItalic: Platform.select({
            android: 'ProximaNovaLg_BlackItalic',
            ios: 'ProximaNova-BlackIt'
        }),
        ProximaNovaLg_Bold_Italic: Platform.select({
            android: 'ProximaNovaLg_Bold_Italic',
            ios: 'ProximaNova-BoldIt'
        }),
        ProximaNovaLg_Bold: Platform.select({
            android: 'ProximaNovaLg_Bold',
            ios: 'ProximaNova-Bold'
        }),
        ProximaNovaLg_Light_Italic: Platform.select({
            android: 'ProximaNovaLg_Light_Italic',
            ios: 'ProximaNova-LightIt'
        }),
        ProximaNovaLg_Light: Platform.select({
            android: 'ProximaNovaLg_Light',
            ios: 'ProximaNova-Light'
        }),
        ProximaNovaLg_Regular_Italic: Platform.select({
            android: 'ProximaNovaLg_Regular_Italic',
            ios: 'ProximaNova-RegularIt'
        }),
        ProximaNovaLg_Regular: Platform.select({
            android: 'ProximaNovaLg_Regular',
            ios: 'ProximaNova-Regular'
        }),
        ProximaNovaLg_Semibold_Italic: Platform.select({
            android: 'ProximaNovaLg_Semibold_Italic',
            ios: 'ProximaNova-SemiboldIt'
        }),
        ProximaNovaLg_Semibold: Platform.select({
            android: 'ProximaNovaLg_Semibold',
            ios: 'ProximaNova-Semibold'
        }),
        ProximaNovaLg_Thin_Italic: Platform.select({
            android: 'ProximaNovaLg_Thin_Italic',
            ios: 'ProximaNova-ThinIt'
        }),
        ProximaNovaLg_Thin: Platform.select({
            android: 'ProximaNovaLg_Thin',
            ios: 'ProximaNovaT-Thin'
        }),
    }
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        var _style = this.props.style;
        var children = this.props.children;
        var style = StyleSheet.flatten([
            {
                // color: 'black',
                fontSize: 14,
                fontFamily: TextCus.FontCustom.Arial,
                fontFamily: TextCus.FontCustom.ProximaNovaLg_Regular,
                // fontFamily: Text.FontCustom.ProximaNovaLg_Regular_Italic
            },
            _style,
        ]);
        if (this.props.text != null) {
            children = this.props.text;
        }
        if (children != null && children.constructor == String)
            children = translate(children, this.props.language) || children;

        style.fontSize = (style.fontSize || 14) * this.props.scaleFontSize;
        return (
            <TextRN
                allowFontScaling={false}
                selectable={this.props.selectable}
                {...this.props}
                style={style}
            >
                {children}
            </TextRN>
        )
    }
}

TextCus.defaultProps = {
    selectable: false,
    scaleFontSize: 1,
    onPress: null,
    text: null
}

TextCus = connect((state) => {
    return {
        // scaleFontSize: state.debug.scaleFontSize,
        language: state.settings.language
    }
}, {})(TextCus)