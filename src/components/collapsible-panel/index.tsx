import React, { Component } from 'react';
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  StyleSheet
} from 'react-native';
import { Icon, Text } from 'native-base';

import { Widgets } from 'summer';

let { theme } = Widgets

interface CollapsiblePanelProps {
  title: string,
}

class CollapsiblePanel extends Component<CollapsiblePanelProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      expanded: true,
      animatedValue: new Animated.Value(0),
      bodyHeight: -1,
      calculatedHeight: false,
      firstClick: true
    }
  }
  render() {
    const { title, children } = this.props;
    const initialHeight = this.state.expanded ? this.state.bodyHeight : 0;
    const finialHeight = this.state.expanded ? 0 : this.state.bodyHeight;

    const initialRotate = this.state.expanded ? '0deg' : '180deg';
    const finialRotate = this.state.expanded ? '180deg' : '360deg';

    const bodyHeight = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialHeight, finialHeight]
    });

    const iconRotate = this.state.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [initialRotate, finialRotate]
    });

    return (
      <View style={ styles.container }>
        <TouchableWithoutFeedback onPress={ () => this.toggle() }>
          <View style={ styles.titleContainer }>
            <Text style={ {
              flex: 1,
              fontSize: theme.font_size_caption
            } }>{ title }</Text>
            <Animated.View style={ { transform: [{ rotate: iconRotate }] } }>
              <Icon name="arrow-down" style={ {
                color: theme.color_grey,
                fontSize: 22,
              } } />
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

    if (!this.state.firstClick) {
      this.setState({
        expanded: !this.state.expanded
      });
    } else {
      this.setState({
        firstClick: false
      })
    }

    Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 300
      }
    ).start()
  }

  setBodyHeight = (event: any) => {
    if (!this.state.calculatedHeight) {

      this.setState({
        bodyHeight: event.nativeEvent.layout.height,
        calculatedHeight: true
      });
    }
  }

}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    overflow: 'hidden',
    borderTopWidth: theme.border_width_sm,
    borderBottomWidth: theme.border_width_sm
  },
  titleContainer: {
    flexDirection: 'row',
    borderBottomWidth: theme.border_width_sm,
    paddingHorizontal: 10,
    height: 48,
    alignItems: 'center'
  },
})

export default CollapsiblePanel;