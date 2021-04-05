import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { sleep, toggleLoading } from '../Utils/extends';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad = async() => {
        toggleLoading(true)
        await sleep(2000)
        toggleLoading(false)
    }

    render() {
        return (
            <View>
                <Text> Home </Text>
            </View>
        );
    }
}
