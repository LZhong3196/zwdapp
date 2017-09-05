import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableHighlight,
  Animated,
  ScrollView,
  ViewStyle,
  Platform
} from "react-native";

import styles, { btnStyle, sheetStyle, hairlineWidth } from "./styles";


const TITLE_H = 40;
const CANCEL_MARGIN = 6;
const BUTTON_H = 50 + hairlineWidth;
const WARN_COLOR = "#ff3b30";
const MAX_HEIGHT = Dimensions.get("window").height * 0.7;
const IS_ANDROID = Platform.OS === "android";

export type ActionSheetConfig = {
  title?: string;
  options: string[];
  tintColor?: string;
  cancelButtonIndex: number;
  destructiveButtonIndex?: number;
};

class ActionSheet extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      visible: false,
      title: "",
      cancelButtonIndex: null,
      destructiveButtonIndex: null,
      options: [],
      tintColor: "#007aff",
      callback: () => { },
      translateY: 0,
      sheetAnim: new Animated.Value(0)
    };

  }

  private scrollEnabled = false;
  static actionsheetInstance: any;

  static show(config: ActionSheetConfig, callback?: (index: number) => void) {
    this.actionsheetInstance.showActionSheet(config, callback);
  }

  showActionSheet(config: ActionSheetConfig, callback?: (index: number) => void) {
    const height = this._calculateHeight(config);

    this.setState({
      visible: true,
      title: config.title,
      cancelButtonIndex: config.cancelButtonIndex,
      destructiveButtonIndex: config.destructiveButtonIndex,
      options: config.options,
      tintColor: config.tintColor || this.state.tintColor,
      callback: callback || this.state.callback,
      translateY: height,
      sheetAnim: new Animated.Value(height)
    }, () => {
      Animated.timing(this.state.sheetAnim, {
        toValue: 0,
        duration: 250
      }).start();
    });
  }

  hide = (index: number) => {
    this._hideSheet(() => {
      this.setState({
        visible: false,
      }, () => {
        // use setTimeout to fix: UI will be blocked when show Alert while closing Modal, for more information, please refer to https://github.com/facebook/react-native/issues/10471
        setTimeout(() => {
          this.state.callback(index);
        }, 100);
      });

    });
  }

  _cancel = () => {
    const { cancelButtonIndex } = this.state;
    // 保持和 ActionSheetIOS 一致，
    // 未设置 cancelButtonIndex 时，点击背景不隐藏 ActionSheet
    if (cancelButtonIndex > -1) {
      this.hide(cancelButtonIndex);
    }
  }

  _hideSheet(callback: () => void) {
    Animated.timing(this.state.sheetAnim, {
      toValue: this.state.translateY,
      duration: 150
    }).start(callback || function () { });
  }

  _calculateHeight({ options, title }: any) {
    let count = options.length;
    let height: number = 0;

    if (IS_ANDROID) {
      height = BUTTON_H * (count - 1);
    } else {
      height = BUTTON_H * count + CANCEL_MARGIN;
    }

    if (title) {
      height += TITLE_H;
    }

    if (height > MAX_HEIGHT) {
      this.scrollEnabled = true;
      return MAX_HEIGHT;
    } else {
      this.scrollEnabled = false;
      return height;
    }
  }

  _renderTitle() {
    const title = this.state.title;

    if (!title) {
      return null;
    }

    return (
      <View style={ [sheetStyle.title] }>
        <Text style={ sheetStyle.titleText }>{ title }</Text>
      </View>
    );
  }

  _renderCancelButton() {
    let { options, cancelButtonIndex, tintColor } = this.state;

    if (cancelButtonIndex > -1 && options[cancelButtonIndex] && !IS_ANDROID) {
      return (
        <TouchableHighlight
          activeOpacity={ 1 }
          underlayColor="#f4f4f4"
          style={ [btnStyle.wrapper, { marginTop: CANCEL_MARGIN }] }
          onPress={ this._cancel }
        >
          <Text style={ [btnStyle.title, { fontWeight: "700", color: tintColor }] }>{ options[cancelButtonIndex] }</Text>
        </TouchableHighlight>
      );
    } else {
      return null;
    }
  }

  _createButton(title: string, fontColor: string, index: number) {
    return (
      <TouchableHighlight
        key={ index }
        activeOpacity={ 1 }
        underlayColor="#f4f4f4"
        style={ btnStyle.wrapper }
        onPress={ this.hide.bind(this, index) }
      >
        <Text style={ [btnStyle.title, { color: fontColor }] }>{ title }</Text>
      </TouchableHighlight>
    );
  }

  _renderOptions() {
    let { options, tintColor, cancelButtonIndex, destructiveButtonIndex } = this.state;

    return options.map((title: string, index: number) => {
      let fontColor = destructiveButtonIndex === index ? WARN_COLOR : tintColor;
      return index === cancelButtonIndex ? null : this._createButton(title, fontColor, index);
    });
  }

  render() {
    const { visible, sheetAnim, cancelButtonIndex } = this.state;
    return (
      <Modal
        visible={ visible }
        transparent={ true }
        animationType="none"
        onRequestClose={ this._cancel }
      >
        <View style={ sheetStyle.wrapper }>
          <Text style={ styles.overlay } onPress={ this._cancel }></Text>
          <Animated.View
            style={ [sheetStyle.bd, { height: this.state.translateY, transform: [{ translateY: sheetAnim }] }] }
          >
            { this._renderTitle() }
            <ScrollView
              scrollEnabled={ this.scrollEnabled }
            >
              { this._renderOptions() }
            </ScrollView>
            { this._renderCancelButton() }
          </Animated.View>
        </View>
      </Modal>
    );
  }
}


export default ActionSheet;