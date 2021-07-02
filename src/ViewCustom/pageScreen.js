import React, { Component } from 'react';
import { SafeAreaView, View } from 'react-native';

export default class PageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        this.props.onLoad != null && props.onLoad();
        return () => {
            this.props.onClose && props.onClose();
        }
    }

    render() {
        return (
            <View 
                style={
                    [
                        { flex: 1 },
                        this.props.style
                    ]
                }
            >
                {this.props.children}
            </View>
        );
    }
}
