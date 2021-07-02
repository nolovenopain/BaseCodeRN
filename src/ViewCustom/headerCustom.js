import React from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
import color from '../Utils/color';
import { Ionicons } from './iconCustom';
import TextCus from './textCustom';
import ButtonCus from './buttonCustom';
import LinearGradient from 'react-native-linear-gradient';
import { translate } from '../Language/index';
import { goBack } from '../Navigators/rootNavigation';
import { withNavigation } from '@react-navigation/compat';
import { connect } from 'react-redux';
import { Dimensions } from '../Constants';
import { hasNotch } from '../Helper/helper';

export default class HeaderCus extends React.PureComponent {

    goback = () => {
        this.props.clearForm ? this.props.clearForm() : null
        goBack()
    } 

    _render = () => {
        var title = this.props.title || '';
        title = translate(title, this.props.language) || title;
        return (
            <>
                { Platform.OS === 'android' ? <View style={{ height: Dimensions.statusHeight }} /> : null }    
                <View 
                    style={{ 
                        height: Dimensions.headerHeight, 
                        width: Dimensions.width 
                    }}
                >
                    {
                        this.props.children != null ? 
                            this.props.children 
                                :
                            <TextCus
                                style={{
                                    fontSize: 18,
                                    color: 'black',
                                    textAlign: 'center',
                                    fontFamily: TextCus.FontCustom.Roboto_Bold,
                                    paddingLeft: 60,
                                    paddingRight: 60
                                }}
                                ellipsizeMode='tail'
                                numberOfLines={1}
                            >
                                {title}
                            </TextCus>
                    }
                    <>
                        <View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                justifyContent: 'center',
                                flexDirection: 'row'
                            }}
                        >
                            {this.props.isBack ?
                                <ButtonCus
                                    style={{
                                        paddingBottom: 12,
                                        backgroundColor: color.transparent,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    onPress={this.goback}
                                >
                                    <Ionicons icon='chevron-back' size={25} />
                                </ButtonCus>
                                    : this.props.isMenu ?
                                        <ButtonCus
                                            style={{
                                                paddingLeft: 5,
                                                paddingBottom: 3,
                                                backgroundColor: color.transparent,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                            onPress={() => this.props.navigation.openDrawer()}
                                        >
                                            <Ionicons icon='menu-outline' color='gray' size={35} />
                                        </ButtonCus>
                                        : null
                                }
                            </View>
                            {this.props.rightComponent != null &&
                                
                                <View
                                    style={{
                                        position: 'absolute',
                                        right: 5,
                                        bottom: 2,
                                        justifyContent: 'center',

                                    }}
                                >
                                    {this.props.rightComponent}
                                </View>
                            }
                        </>
                </View>
            </>
        )
    }

    render() {
        return (
            <SafeAreaView>
                {this.props.backgroundGradient ?
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={[color.headerColorWhite, '#516ac5']}
                        style={[
                            {
                                width: '100%',
                                paddingTop: hasNotch() ? 0 : 10
                            },
                            this.props.styleContainer
                        ]}
                    >
                        {this._render()}
                    </LinearGradient>
                    :
                    <View
                        style={[
                            {
                                backgroundColor: color.headerColorWhite,
                                width: '100%',
                                paddingTop: hasNotch() ? 0 : 10
                            },
                            this.props.styleContainer
                        ]}
                    >
                        {this._render()}
                    </View>
                }
            </SafeAreaView>
        )
    }
}

HeaderCus.defaultProps = {
    isBack: false,
    isMenu: false,
    rightComponent: null,
    backgroundGradient: true
}

HeaderCus = withNavigation(connect(state => ({
    language: state.settings.language
}))(HeaderCus))