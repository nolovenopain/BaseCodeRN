import React, { Component } from 'react';
import { ActivityIndicator, Image as ImageRN, StyleSheet, View } from 'react-native';
import { images } from '../Constants/index';
import FastImage from 'react-native-fast-image';
import Config from "react-native-config";

export default class ImageCus extends Component {
    static genericUri = (uri) => {
        // if (!uri.startsWith('http')) {
        //     if (uri.startsWith('/')) {
        //         uri = uri.replace('/', '');
        //     }
        //     uri = Config.DEV_BASE_URL + uri;
        // }
        return uri;
    }

    constructor(props) {
        super(props)
        this.source = this.props.source;
        this.state = {
            isLoaded: false,
            isError: false,
            width: 60,
            height: 60,
        }
    }

    source = null;

    componentDidMount() {
        this.loading()
    }

    loading = () => {
        try {
            if (this.source.constructor == Number) {
                this.setState({ isLoaded: true, isError: false })
            }
            else if(this.source.uri.constructor == String) {
                var uri = ImageCus.genericUri(this.source.uri)

                ImageRN.prefetch(uri).then((status) => {
                    if (this.props.autoHeight) {
                        ImageRN.getSize(uri, (w, h) => {
                            console.log(w, h);
                            this.setState({ 
                                isLoaded: status, 
                                isError: false, 
                                width: w, 
                                height: h 
                            })
                        });
                    }
                    else {
                        this.setState({ 
                            isLoaded: status, 
                            isError: false 
                        })
                    }
                }, (error) => {
                    this.setState({ isError: true })
                })
            }
        } catch (error) { 
            this.setState({ isError: true })
        }
    }

    render() {
        var style = StyleSheet.flatten(this.props.style)
        var { size, color } = this.props;

        return (
            this.state.isError ?
                <FastImage
                    source={images.errorImage}
                    style={{
                        width: style.width,
                        height: style.height,
                    }}
                />
                : !this.state.isLoaded ?
                    <View 
                        style={{
                            width: style.width,
                            height: style.height,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ActivityIndicator color={color ? color : 'rgba(0,0,0,0.4)'} size={size ? size : 'small'} />
                    </View>
                        :
                    <FastImage
                        resizeMode={this.props.resizeMode ? this.props.resizeMode : 'contain'}
                        {...this.props}
                        style={[
                            {},
                            style,
                        ]}
                    />
        )
    }
}

ImageCus.defaultProps = {
    autoHeight: false
}
