import React, { Component } from 'react';
import Slider from '@react-native-community/slider';
import { View, Text, StyleSheet } from 'react-native';
import color from '../../Utils/color';

export default class ProgressBar extends Component {

    getMinutesFromSeconds = time => {
        const minutes = time >= 60 ? Math.floor(time / 60) : 0;
        const seconds = Math.floor(time - minutes * 60);
    
        return `${minutes >= 10 ? minutes : '0' + minutes}:${seconds >= 10 ? seconds : '0' + seconds}`;
    }

    handleOnSlide = time => {
        this.props.onSlideCapture({ seekTime: time });
    }

    render() {
        const {
            currentTime,
            duration,
            onSlideStart,
            onSlideComplete,
        } = this.props
        const position = this.getMinutesFromSeconds(currentTime);
        const fullDuration = this.getMinutesFromSeconds(duration);

        return (
            <View style={styles.wrapper}>
                <Slider
                    value={currentTime}
                    minimumValue={0}
                    maximumValue={duration}
                    step={1}
                    onValueChange={this.handleOnSlide}
                    onSlidingStart={onSlideStart}
                    onSlidingComplete={onSlideComplete}
                    minimumTrackTintColor={color.blueScroll}
                    maximumTrackTintColor={'gray'}
                    thumbTintColor={'white'}
                />
                <View style={styles.timeWrapper}>
                    <Text style={styles.timeLeft}>{position}</Text>
                    <Text style={styles.timeRight}>{fullDuration}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        
    },
    timeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 5,
    },
    timeLeft: {
        flex: 1,
        color: '#FFFFFF',
        paddingLeft: 10,
    },
    timeRight: {
        flex: 1,
        color: '#FFFFFF',
        textAlign: 'right',
        paddingRight: 10,
    },
});
