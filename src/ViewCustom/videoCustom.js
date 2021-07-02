import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';

export default class VideoCus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repeat: false,
            rate: 1,
            volume: 1,
            muted: false,
            resizeMode: 'contain',
            duration: 0.0,
            currentTime: 0.0,
            paused: false,
            rateText: '1.0',
            pausedText: 'Play',
            hideControls: false
        };
    }

    changeTogglePaused = () => {
        this.setState({ paused: !this.state.paused })
    }

    onLoad = data => {
        this.setState({ duration: data.duration })
    }

    onPress = data => {
        this.setState({ currentTime: data.currentTime })
    }

    onEnd = () => {
        this.setState({ pausedText: 'Play', paused: true })
        this.video.seek(0)
    }

    render() { 
        const item = this.props.item
        const style = this.props.style
        return (
            <TouchableWithoutFeedback onPress={this.changeTogglePaused}>
                <Video
                    ref={ref => this.video = ref}
                    controls
                    source={{ uri: item.path }}
                    repeat={this.state.repeat}
                    rate={this.state.rate}
                    volume={this.state.volume}
                    muted={this.state.muted}
                    resizeMode={this.state.resizeMode}
                    paused={this.state.paused}
                    onLoad={this.onLoad}
                    onProgress={this.onPress}
                    onEnd={this.onEnd}
                    style={style}
                />
            </TouchableWithoutFeedback>
        );
    }
}
