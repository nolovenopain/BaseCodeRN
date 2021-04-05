import { useSelector } from 'react-redux';
import React from 'react';
import { View, Text } from 'react-native';
import color from '../color';
import BarIndicator from './barIndicator';

export default Loading = (props) => {
    const isLoading = useSelector(state => state.global.isLoading);

    return (
        !isLoading ? null :
            <View
                style={{
                    position: "absolute",
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0,0,0,.1)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <BarIndicator
                    style={{}}
                    color={color.headerColor} count={5} size={30}
                />
                <Text
                    style={{
                        color: color.headerColor,
                        marginTop: 10,
                        fontSize: 16
                    }}
                >
                    {'Đang tải ...'}
                </Text>
            </View>
    )
}