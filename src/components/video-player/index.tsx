import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  PanResponder
} from "react-native";
import Video from "react-native-video";
import { padStart } from "lodash";

import styles from "./style";
import { Widgets } from "summer";

let { Icon } = Widgets;

export interface VideoPlayerProps {
  source: any;
  muted?: boolean;
  autoPlay?: boolean;
  resizeMode?: "cover" | "contain" | "stretch";
  repeat?: boolean;
  playInBackground?: boolean;
  playWhenInactive?: boolean;
  ignoreSilentSwitch?: "ignore" | "obey";
  showControlsTimeOut?: number;
}

class VideoPlayer extends Component<VideoPlayerProps, any> {

  static defaultProps = {
    muted: false,
    autoPlay: true,
    resizeMode: "contain",
    repeat: false,
    playInBackground: false,
    playWhenInactive: false,
    ignoreSilentSwitch: "ignore",
    showControlsTimeOut: 5000
  };

  constructor(props: any) {
    super(props);

    this.state = {
      playing: this.props.autoPlay,
      duration: 0.0,
      currentTime: 0.0,
      seeking: false,
      seekerWidth: 0,
      seekerOffset: 0,
      seekerFillWidth: 0,
      seekerPosition: 0,
      showControls: false
    };
  }

  player: any;
  seekPanResponder: any;
  controlsTimer: any;

  componentWillMount() {
    this.initSeekPanResponder();
  }


  render() {
    const { source, muted, resizeMode, repeat, playInBackground, playWhenInactive, ignoreSilentSwitch } = this.props;
    const { playing, seeking } = this.state;

    return (
      <TouchableWithoutFeedback onPress={ this.showControls }>
        <View style={ styles.playerContainer } >
          <Video source={ source }
            ref={ (ref) => {
              this.player = ref;
            } }
            rate={ 1.0 }
            volume={ 1.0 }
            muted={ muted }
            paused={ !playing || seeking }
            resizeMode={ resizeMode }
            repeat={ repeat }
            playInBackground={ playInBackground }
            playWhenInactive={ playWhenInactive }
            ignoreSilentSwitch={ ignoreSilentSwitch }
            progressUpdateInterval={ 100 }
            onLoad={ this.onLoad }
            onEnd={ this.onEnd }
            onProgress={ this.onProgress }
            style={ styles.video } />
          { this.renderControls() }
          { this.renderMinSeekBar() }
        </View >
      </TouchableWithoutFeedback>
    );
  }

  renderMinSeekBar() {
    if (this.state.showControls) {
      return null;
    }

    return (
      <View style={ [styles.minSeekBar, { width: `${this.calculateMinSeekBarWidth()}%` }] }>
      </View>
    );
  }

  renderControls() {
    if (!this.state.showControls) {
      return null;
    }

    const { duration, currentTime, progress, seekerFillWidth, seekerPosition } = this.state;
    return (
      <View style={ styles.controls }>
        <TouchableWithoutFeedback onPress={ this.togglePlay }>
          <View style={ styles.controlsItemLeft }>
            {
              this.state.playing ? <Icon type="&#xe693;" style={ { color: "#fff" } } /> : <Icon type="&#xe676;" style={ { color: "#fff" } } />
            }
          </View>
        </TouchableWithoutFeedback>
        <View style={ styles.controlsItemLeft }>
          <Text style={ styles.timerText }>{ this.formatTime(duration) }</Text>
        </View>
        <View style={ styles.seekBar } onLayout={ (event) => { this.setState({ seekerWidth: event.nativeEvent.layout.width }); } }>
          <View style={ styles.seekTrack }>
            <View style={ [styles.seekFill, { width: seekerFillWidth }] }></View>
          </View>
          <View style={ [styles.seekHandler, { left: seekerPosition }, this.state.seeking && { transform: [{ scale: 1 }] }] } {...this.seekPanResponder.panHandlers}></View>
        </View>
        <View style={ styles.controlsItemRight }>
          { <Text style={ styles.timerText }> { this.calculateRemainingTime() }</Text> }
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
    if (this.state.seeking) {
      return;
    }

    const position = this.calculateSeekerPosition();
    this.setSeekerPosition(position);

    this.setState({
      currentTime: event.currentTime,
    }, );
  }

  onEnd = () => {
    if (!this.props.repeat) {
      this.setState({
        playing: false
      });
    }
  }

  calculateRemainingTime() {
    const time = this.state.duration - this.state.currentTime;
    return `-${this.formatTime(time)}`;
  }

  formatTime(time = 0) {
    time = Math.min(
      Math.max(time, 0),
      this.state.duration
    );

    const minutes = time / 60;
    const seconds = time % 60;

    const formattedMinutes = padStart(Math.floor(minutes).toFixed(0), 2, "0");
    const formattedSeconds = padStart(Math.round(seconds).toFixed(0), 2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  }

  initSeekPanResponder() {
    this.seekPanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onMoveShouldSetPanResponder: (event, gestureState) => true,

      onPanResponderGrant: (event, gestureState) => {
        this.setState({
          seeking: true,
        });
      },

      onPanResponderMove: (event, gestureState) => {
        this.clearControlsTimer();

        const position = this.state.seekerOffset + gestureState.dx;
        this.setSeekerPosition(position);

        const time = this.calculateTimeFromSeekerPosition();
        this.setState({
          currentTime: time
        });
      },

      onPanResponderRelease: (event, gestureState) => {
        const time = this.calculateTimeFromSeekerPosition();

        let state = this.state;
        if (time > this.state.duration) {
          state.playing = false;
        } else {
          this.seekTo(time);
          state.seeking = false;
        }
        this.setState(state);

        this.autoHideControls();
      }
    });
  }

  calculateSeekerPosition() {
    const percent = this.state.currentTime / this.state.duration;
    return this.state.seekerWidth * percent;
  }

  calculateTimeFromSeekerPosition() {
    const percent = this.state.seekerPosition / this.state.seekerWidth;
    return this.state.duration * percent;
  }

  setSeekerPosition(position = 0) {
    position = this.constrainToSeekerMinMax(position);

    let state = this.state;
    state.seekerFillWidth = position;
    state.seekerPosition = position;

    if (!state.seeking) {
      state.seekerOffset = position;
    }

    this.setState(state);
  }

  constrainToSeekerMinMax(val = 0) {
    if (val <= 0) {
      return 0;
    } else if (val >= this.state.seekerWidth) {
      return this.state.seekerWidth;
    }
    return val;
  }

  seekTo(time = 0) {
    this.player.seek(time);
    this.setState({
      currentTime: time
    });
  }

  calculateMinSeekBarWidth() {
    return (this.state.currentTime / this.state.duration) * 100;
  }

  showControls = () => {
    this.setState({
      showControls: true
    });

    this.autoHideControls();

  }

  clearControlsTimer = () => {
    clearTimeout(this.controlsTimer);
  }

  autoHideControls() {
    const { showControlsTimeOut } = this.props;
    this.clearControlsTimer();
    this.controlsTimer = setTimeout(() => {
      this.setState({
        showControls: false
      });
    }, showControlsTimeOut);
  }

  togglePlay = () => {
    this.setState({
      playing: !this.state.playing
    });
  }
}

export default VideoPlayer;