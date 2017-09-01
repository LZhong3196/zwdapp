import React, { Component } from "react";
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  TextStyle
} from "react-native";
import { Text } from "native-base";

import { Widgets } from "summer";

let { theme, Icon } = Widgets;

interface CollapsiblePanelProps {
  title: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  headerStyle?: ViewStyle;
  collapsed?: boolean; // 默认是否收起，目前是是采用先展开得到内容的高度再收起，所以如果为true会看到组件会有个收起的过程；如果你有好办法，请优化
}

class CollapsiblePanel extends Component<CollapsiblePanelProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      expanded: true,
      animatedValue: new Animated.Value(0),
      bodyHeight: -1,
      calculatedHeight: false,
      firstClick: true,
      initHide: false
    };
  }

  render() {
    const { title, children, style, titleStyle, headerStyle, collapsed } = this.props;
    const initialHeight = this.state.expanded ? this.state.bodyHeight : 0;
    const finialHeight = this.state.expanded ? 0 : this.state.bodyHeight;

    let initialRotate = this.state.expanded ? "0deg" : "180deg";
    let finialRotate = this.state.expanded ? "180deg" : "360deg";

    if (collapsed) {
      if (this.state.firstClick) {
        initialRotate = this.state.expanded ? "0deg" : "0deg";
        finialRotate = this.state.expanded ? "180deg" : "180deg";
      } else {
        initialRotate = this.state.expanded ? "180deg" : "0deg";
        finialRotate = this.state.expanded ? "360deg" : "180deg";
      }
    } else {
      initialRotate = this.state.expanded ? "0deg" : "180deg";
      finialRotate = this.state.expanded ? "180deg" : "360deg";
    }

    const bodyHeight = this.state.initHide ? 0 : this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialHeight, finialHeight]
    });

    const iconRotate = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialRotate, finialRotate]
    });

    const iconSize = (titleStyle && titleStyle.fontSize || theme.font_size_caption) + 6;
    return (
      <View style={ [styles.container, style] }>
        <TouchableWithoutFeedback onPress={ () => this.toggle() }>
          <View style={ [styles.titleContainer, headerStyle] }>
            <Text style={ {
              flex: 1,
              fontSize: theme.font_size_caption,
              ...titleStyle
            } }>{ title }</Text>
            <Animated.View style={ { transform: [{ rotate: iconRotate }] } }>
              <Icon type="&#xe61a;" style={ {
                color: theme.color_grey,
              } } size={ iconSize } />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        <Animated.View onLayout={ this.setBodyHeight } style={ { height: bodyHeight } }>
          { children }
        </Animated.View>
      </View>
    );
  }

  toggle() {
    this.state.animatedValue.setValue(0);

    let state = this.state;

    state.initHide = false;

    if (!this.state.firstClick || this.props.collapsed) {
      state.expanded = !state.expanded;
    }

    if (this.state.firstClick) {
      state.firstClick = false;
    }

    this.setState(state);

    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 300
      }
    ).start();
  }

  setBodyHeight = (event: any) => {
    if (!this.state.calculatedHeight) {
      this.setState({
        bodyHeight: event.nativeEvent.layout.height,
        calculatedHeight: true,
      }, () => {
        if (this.props.collapsed) {
          this.setState({
            initHide: true
          });
        }
      });
    }
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  titleContainer: {
    flexDirection: "row",
    borderTopWidth: theme.border_width_sm,
    borderBottomWidth: theme.border_width_sm,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: theme.color_grey
  },
});

export default CollapsiblePanel;