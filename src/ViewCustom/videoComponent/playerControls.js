import React, { Component } from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
    VideoSkipBack,
    VideoPrevious,
    VideoPause,
    VideoPlay,
    VideoNext,
    VideoSkipForward,
    VideoReplay
} from '../../Assets/VideoIcons';
import { MaterialIcons } from '../iconCustom';

export default class PlayerControls extends Component {

    render() {
        const {
            playing,
            showPreviousAndNext,
            showSkip,
            previousDisabled,
            nextDisabled,
            onPlay,
            onPause,
            skipForwards,
            skipBackwards,
            onNext,
            onPrevious,
            replayShowing,
            onReplay
        } = this.props

        return (
            <View style={styles.wrapper}>
                {showPreviousAndNext && (
                    <TouchableOpacity
                        style={[styles.touchable, previousDisabled && styles.touchableDisabled]}
                        onPress={onPrevious}
                        disabled={previousDisabled}
                    >
                        <VideoPrevious />
                    </TouchableOpacity>
                )}

                {showSkip && (
                    <TouchableOpacity 
                        style={styles.touchable} 
                        onPress={skipBackwards}
                    >
                        <VideoSkipBack />
                    </TouchableOpacity>
                )}
    
                <TouchableOpacity
                    style={styles.touchable}
                    onPress={replayShowing ? onReplay : playing ? onPause : onPlay}
                >
                    {replayShowing ? 
                        <MaterialIcons icon='replay' color='white' size={55} /> 
                        : playing ? <VideoPause /> : <VideoPlay />}
                </TouchableOpacity>

                {showSkip && (
                    <TouchableOpacity 
                        style={styles.touchable} 
                        onPress={skipForwards}
                    >
                        <VideoSkipForward />
                    </TouchableOpacity>
                )}

                {showPreviousAndNext && (
                    <TouchableOpacity
                        style={[styles.touchable, nextDisabled && styles.touchableDisabled]}
                        onPress={onNext}
                        disabled={nextDisabled}
                    >
                        <VideoNext />
                    </TouchableOpacity>
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 3,
        paddingTop: 40
    },
    touchable: {
        padding: 5,
    },
    touchableDisabled: {
        opacity: 0.3,
    },
});
