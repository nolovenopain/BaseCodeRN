import React, { Component } from 'react';
import { ActivityIndicator, Image as ImageRN, StyleSheet, View } from 'react-native';
import { images, URL } from '../Constants/index';
import FastImage from 'react-native-fast-image';

export default class ImageCus extends Component {
    static genericUri = (uri) => {
        // if (!uri.startsWith('http')) {
        //     if (uri.startsWith('/')) {
        //         uri = uri.replace('/', '');
        //     }
        //     uri = URL.API_BASE_URL_RELEASE + uri;
        // }
        return uri;
    }

    constructor(props) {
        super(props)
        this.source = this.props.source;
        this.state = {
            isLoaded: false,
            isError: false,
            width: 0,
            height: 0,
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

                ImageRN.prefetch(uri).then(status => {
                    if(this.props.autoHeight) {
                        ImageRN.getSize(uri, (w, h) => {
                            this.setState({
                                isLoaded: status,
                                isError: false,
                                with: w,
                                height: h
                            })
                        }) 
                    }
                    else {
                        this.setState({
                            isLoaded: status,
                            isError: false,
                        })
                    }
                }, error => {
                    this.setState({ isError: true })
                })
            }
        } catch (error) { 
            this.setState({ isError: true })
        }
    }

    render() {
        var style = StyleSheet.flatten(this.props.style)
        var { autoHeight } = this.props;

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
                        }}
                    >
                        <ActivityIndicator color='#ccc'/>
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
