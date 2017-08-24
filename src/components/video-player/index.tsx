import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback
} from "react-native";
import Video from "react-native-video";

import styles from "./style";

export interface VideoPlayerProps {
  source: any;
  muted?: boolean;
  autoPlay?: boolean;
  resizeMode?: "cover" | "contain" | "stretch";
  repeat?: boolean;
  playInBackground?: boolean;
  playWhenInactive?: boolean;
  ignoreSilentSwitch?: "ignore" | "obey";
}

class VideoPlayer extends Component<VideoPlayerProps, any> {

  static defaultProps = {
    muted: false,
    autoPlay: true,
    resizeMode: "contain",
    repeat: false,
    playInBackground: false,
    playWhenInactive: false,
    ignoreSilentSwitch: "ignore"
  };

  constructor(props: any) {
    super(props);

    this.state = {
      playing: this.props.autoPlay,
      duration: 0.0,
      currentTime: 0.0,
      progress: 0
    };
  }

  player: any;

  render() {
    const { source, muted, resizeMode, repeat, playInBackground, playWhenInactive, ignoreSilentSwitch } = this.props;
    const { playing, progress } = this.state;

    return (
      <TouchableWithoutFeedback>
        <View style={ styles.playerContainer } >
          <Video source={ source }
            ref={ (ref) => {
              this.player = ref;
            } }
            rate={ 1.0 }
            volume={ 1.0 }
            muted={ muted }
            paused={ !playing }
            resizeMode={ resizeMode }
            repeat={ repeat }
            playInBackground={ playInBackground }
            playWhenInactive={ playWhenInactive }
            ignoreSilentSwitch={ ignoreSilentSwitch }
            progressUpdateInterval={ 250.0 }
            onLoad={ this.onLoad }
            onProgress={ this.onProgress }
            style={ styles.video } />
          { this.renderControls() }
          <View style={ [styles.minSeekBar, { width: `${progress}%` }] }>
          </View>
        </View>
      </TouchableWithoutFeedback >
    );
  }

  renderControls() {
    const { duration, currentTime, progress } = this.state;
    return (
      <View style={ styles.controls }>
        <View style={ styles.controlsItemLeft }><Text>播放</Text></View>
        <View style={ styles.controlsItemLeft }>
          <Text style={ styles.controlsText }>{ duration.toFixed(2) }</Text>
        </View>
        <View style={ styles.seekBar }>
          <View style={ styles.seekTrack }>
            <View style={ [styles.seekFill, { width: `${progress}%` }] }></View>
          </View>
          <View style={ [styles.seekHandler, { left: `${progress}%` }] }></View>
        </View>
        <View style={ styles.controlsItemRight }>
          {/* <Text style={ styles.controlsText }> { currentTime.toFixed(2) }</Text> */ }
        </View>
      </View >
    );
  }

  onLoad = (data: any): void => {
    this.setState({
      duration: data.duration
    });
  }

  onProgress = (event: any): void => {
    this.setState({
      currentTime: event.currentTime,
      progress: (event.currentTime / this.state.duration) * 100
    });
  }
}

export default VideoPlayer;