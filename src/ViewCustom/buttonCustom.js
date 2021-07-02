import React from 'react';
import { TouchableOpacity } from 'react-native';
import Text from './textCustom';
import { connect } from 'react-redux';
import { translate } from '../Language';

export default class ButtonCus extends React.PureComponent {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() { 
        var { children, onPress, style } = this.props
        return (
            <TouchableOpacity
                {...this.props}
                activeOpacity={.8}
                onPress={onPress}
                style={[
                    {
                        padding: 10,
                        backgroundColor: style.backgroundColor ? style.backgroundColor : '#f2f2f2',
                        alignItems: 'center'
                    },
                    style,
                    this.props.isShowTouch && {
                        borderColor: 'red',
                        borderWidth: 1,
                    }
                ]}
            >
                {
                    children != null && children.constructor == String ?
                        <Text
                            style={[
                                {
                                    // textAlign: 'center'
                                },
                                this.props.styleText
                            ]}
                        >
                            {translate(children, this.props.language)}
                        </Text>
                        : children
                }
            </TouchableOpacity>
        )
    }
}

ButtonCus = connect(state => {
    return {
        language: state.settings.language
    }
})(ButtonCus)