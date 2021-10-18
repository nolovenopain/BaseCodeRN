import React from 'react';
import { TextInput as TextInputRN, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { translate } from '../Language';
import color from '../Utils/color';
import ButtonCus from './buttonCustom';
import { Ionicons } from './iconCustom';

export default class TextInputCus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: this.props.value,
            required: false,
            showPass: this.props.hideshowText,
        }
    }

    componentDidMount() {
        this.props.onRef ? this.props.onRef(this) : null
    }
    
    componentWillUnmount() {
        this.props.onRef ? this.props.onRef(null) : null
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.value != this.state.value)
            this.setState(s => s.value = nextProps.value)
    }

    clearText = () => {
        this.setState(s => (s.value = '', s.required = true), () => this.props.onChangeText(this.props.name, ''))
    }

    onChangeText = txt => {
        this.setState(s => (s.value = txt, s.required = false), () => this.props.onChangeText(this.props.name, txt))
    }

    showText = () => {
        this.setState({ showPass: !this.state.showPass })
    }

    enterToNextInput = () => {
        this.props.nextInput ? this.props.nextInput.textInput.focus() : null
    }

    render() {
        return (
            <View
                style={[
                    {
                        width: '100%'
                    },
                    this.props.label && { marginTop: 10 },
                    this.props.styleContainer
                ]}
            >
                {this.props.label &&
                    <Text>
                        {translate(this.props.label, this.props.language)}
                    </Text>
                }
                <View
                    style={[
                        {
                            padding: 5,
                            borderColor: '#ccc',
                            borderWidth: this.props.borderWidth ? 1 : 0,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 5
                        },
                        this.props.label && { marginTop: 5 },
                        this.props.styleContainerTextInput,
                    ]}
                >
                    {this.props.leftIcon &&
                        <View
                            style={[
                                {
                                    marginRight: 12
                                },

                            ]}
                        >
                            {this.props.leftIcon}
                        </View>
                    }
                    <TextInputRN
                        {...this.props}
                        ref={input => this.textInput = input}
                        placeholder={
                            this.props.placeholder ? translate(this.props.placeholder, this.props.language) : ''
                        }
                        placeholderTextColor='#ccc'
                        style={[
                            {
                                padding: 0,
                                flex: 1,
                                // fontFamily: Text.FontCustom.ProximaNovaLg_Regular[Platform.OS == 'android' ? 'android' : 'ios'],
                                fontSize: 16,
                                minHeight: this.props.multiline ? 50 : 30,
                                paddingTop: this.props.multiline ? 5 : 0,
                            },
                            this.props.style
                        ]}
                        value={this.state.value}
                        onChangeText={this.onChangeText}
                        secureTextEntry={this.state.showPass}
                        underlineColorAndroid='transparent'
                        autoCompleteType='off'
                        textAlignVertical={this.props.multiline ? 'top' : 'center'}
                        onSubmitEditing={this.enterToNextInput}
                        blurOnSubmit={this.props.nextInput ? false : true}
                    />
                    {
                        this.state.value && this.state.value.trim() != '' && !this.props.multiline && (this.props.editable === undefined || this.props.editable === true) ?
                        <ButtonCus
                            style={{
                                backgroundColor: color.transparent,
                                padding: 5
                            }}
                            onPress={this.clearText}
                        >
                            <Ionicons icon='close' size={18} />
                        </ButtonCus> : null
                    }
                    {
                        this.props.hideshowText && this.props.hideshowIcon ? 
                            <ButtonCus
                                style={{ 
                                    alignItems: 'center',
                                    backgroundColor: color.transparent, 
                                    padding: 5
                                }}
                                onPress={this.showText}
                            >
                                <Ionicons 
                                    icon={this.state.showPass ? 'ios-eye' : 'ios-eye-off'}
                                    size={23}
                                    color='silver' 
                                />
                            </ButtonCus> : null
                    }
                </View>
                {
                    this.state.required && this.props.required ? 
                    <View
                        style={{
                            marginTop: 5
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                color: color.materialRed
                            }}
                        >
                            {'Không được để trống.'}
                        </Text>
                    </View> : null
                }
            </View>
        )
    }
}

TextInputCus.defaultProps = {
    label: null,
    leftIcon: null,
    styleLeftIcon: null,
    styleContainer: null,
    styleContainerText: null,
    onChangeText: () => {}
}

TextInputCus = connect((state) => {
    return {
        language: state.settings.language
    }
}, {})(TextInputCus)