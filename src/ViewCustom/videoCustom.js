import React, { Component } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View, TouchableWithoutFeedback, Platform, ActivityIndicator } from 'react-native'
import { Dimensions } from '../Constants';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import PlayerControls from './videoComponent/playerControls';
import ProgressBar from './videoComponent/progressBar';
import { FullscreenClose, FullscreenOpen } from '../Assets/VideoIcons';

export default class VideoCus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullscreen: false,
            play: false,
            currentTime: 0,
            duration: 0,
            replayShowing: false,
            loadingVideo: false
        };
    }

    componentDidMount() {
        // Orientation.addOrientationListener(this.handleOrientation);
    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });
        // Orientation.removeOrientationListener(this.handleOrientation);
    }

    handleOrientation = orientation => {
        orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
          ? (this.setState({ fullscreen: true }), StatusBar.setHidden(true))
          : (this.setState({ fullscreen: false }), StatusBar.setHidden(false));
    }

    handleFullscreen = () => {
        if(this.state.fullscreen) {
            this.setState({ fullscreen: false })
            Orientation.lockToPortrait()
        }
        else {
            this.setState({ fullscreen: true })
            Orientation.lockToLandscape()
        }
        // this.setState({ fullscreen: !this.setState.fullscreen }, () => {
        //     this.state.fullscreen
        //     ? Orientation.lockToLandscape()
        //     : Orientation.lockToPortrait()
        // })      
    }

    handlePlayPause = () => { 
        // If playing, pause and show controls immediately.
        if (this.state.play) {
            this.setState({ 
                play: false, 
                loadingVideo: false
            });
        }
        else {
            this.setState({ 
                play: true, 
                loadingVideo: true 
            });
        }
    }

    skipBackward = () => {
        this.videoRef.seek(this.state.currentTime - 10);
        this.setState({ currentTime: this.state.currentTime - 10 });
    }

    skipForward = () => {
        this.videoRef.seek(this.state.currentTime + 10);
        this.setState({ currentTime: this.state.currentTime + 10 });
    }
    
    onSeek = data => {
        this.videoRef.seek(data.seekTime);
        this.setState({ currentTime: data.seekTime });
    }

    onLoadEnd = data => {
        this.setState({
            duration: data.duration,
            currentTime: data.currentTime,
        });
    }

    onProgress = data => {
        this.setState({ 
            currentTime: data.currentTime 
        });
    }

    onEnd = () => {
        this.setState({ replayShowing: true });
    }

    onReplay = () => {
        this.videoRef.seek(0)
        this.setState({
            currentTime: 0,
            replayShowing: false,
            play: true
        })
    }

    onLoadStart = () => {
        console.log('onloadStart');
    }

    onReadyForDisplay = () => {
        console.log('onReadyforPlay');
    }

    render() {
        const item = this.props.item
        const style = this.props.style
        return (
            <TouchableWithoutFeedback 
                onPress={this.props.handleShowControls}
                style={style}
            > 
                <View>
                    <Video
                        ref={ref => this.videoRef = ref}
                        source={{ uri: item.path }}
                        style={this.state.fullscreen ? 
                            styles.fullscreenVideo : styles.video}
                        controls={false}
                        resizeMode={'contain'}
                        onLoad={this.onLoadEnd}
                        onProgress={this.onProgress}
                        onEnd={this.onEnd}
                        paused={!this.state.play}
                        onLoadStart={this.onLoadStart}
                        onReadyForDisplay={this.onReadyForDisplay}
                    />
                {
                // this.state.loadingVideo ? 
                //     <View style={styles.loadingVideo}>
                //         <ActivityIndicator color='white' size='large'/>
                //     </View>
                //         :
                     this.props.showControls && (
                        <View style={styles.controlOverlay}>                    
                            <PlayerControls
                                onPlay={this.handlePlayPause}
                                onPause={this.handlePlayPause}
                                playing={this.state.play}
                                showPreviousAndNext={false}
                                showSkip={true}
                                skipBackwards={this.skipBackward}
                                skipForwards={this.skipForward}
                                replayShowing={this.state.replayShowing}
                                onReplay={this.onReplay}
                            />
                            <TouchableOpacity
                                onPress={this.handleFullscreen}
                                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                style={styles.fullscreenButton}>
                                {this.state.fullscreen ? <FullscreenClose /> : <FullscreenOpen />}
                            </TouchableOpacity>
                            <ProgressBar
                                currentTime={this.state.currentTime}
                                duration={this.state.duration > 0 ? this.state.duration : 0}
                                onSlideStart={this.handlePlayPause}
                                onSlideComplete={this.handlePlayPause}
                                onSlideCapture={this.onSeek}
                            />
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        height: Platform.OS === 'ios' ? '95%' : '90%',
        width: Dimensions.width,
        backgroundColor: 'black',
        top: Dimensions.headerHeight
    },
    fullscreenVideo: {
        height: Dimensions.width,
        width: Dimensions.height,
        backgroundColor: 'black',
    },
    fullscreenButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 10,
    },
    controlOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'space-between',
    },
    loadingVideo: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.width,
        height: Dimensions.height
    }
});