import React from 'react'
import { default as AntDesignRN } from 'react-native-vector-icons/AntDesign';
import { default as EvilIconsRN } from 'react-native-vector-icons/EvilIcons';
import { default as FontAwesomeRN } from 'react-native-vector-icons/FontAwesome';
import { default as FontAwesome5RN } from 'react-native-vector-icons/FontAwesome5';
import { default as IoniconsRN } from 'react-native-vector-icons/Ionicons';
import { default as MaterialCommunityIconsRN } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIconsRN } from 'react-native-vector-icons/MaterialIcons';
import { default as FeatherRN } from 'react-native-vector-icons/Feather';
import { default as EntypoRN } from 'react-native-vector-icons/Entypo';
import { default as FontistoRN } from 'react-native-vector-icons/Fontisto';

export default class IconCus extends React.PureComponent {
    static Type = {
        Ionicons: IoniconsRN,
        AntDesign: AntDesignRN,
        EvilIcons: EvilIconsRN,
        MaterialIcons: MaterialIconsRN,
        MaterialCommunityIcons: MaterialCommunityIconsRN,
        FontAwesome: FontAwesomeRN,
        FontAwesome5: FontAwesome5RN,
        Feather: FeatherRN,
        Entypo: EntypoRN,
        Fontisto: FontistoRN
    }
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        var { type, size, color, name, icon, style } = this.props;
        type = type == null || type == '' ? 'Ionicons' : type;
        size = size || 24;
        color = color || 'black';
        name = name || icon || '';

        var IconView = IconCus.Type[type];
        return (
            <IconView style={style} size={size} color={color} name={name} />
        );
    }
}
IconCus.defaultProps = {
    type: '',
    size: '',
    name: '',
    icon: '',
    color: ''
}

var Ionicons = (props) => {
    return <IconCus {...props} type='Ionicons' />
}

var AntDesign = (props) => {
    return <IconCus {...props} type='AntDesign' />
}

var EvilIcons = (props) => {
    return <IconCus {...props} type='EvilIcons' />
}

var MaterialIcons = (props) => {
    return <IconCus {...props} type='MaterialIcons' />
}

var MaterialCommunityIcons = (props) => {
    return <IconCus {...props} type='MaterialCommunityIcons' />
}

var FontAwesome = (props) => {
    return <IconCus {...props} type='FontAwesome' />
}

var FontAwesome5 = (props) => {
    return <IconCus {...props} type='FontAwesome5' />
}

var Feather = (props) => {
    return <IconCus {...props} type='Feather' />
}
var Entypo = (props) => {
    return <IconCus {...props} type='Entypo' />
}

var Fontisto = (props) => {
    return <IconCus {...props} type='Fontisto' />
}

export {
    Ionicons,
    AntDesign,
    EvilIcons,
    MaterialIcons, 
    MaterialCommunityIcons,
    FontAwesome,
    FontAwesome5,
    Feather,
    Entypo, 
    Fontisto
}

