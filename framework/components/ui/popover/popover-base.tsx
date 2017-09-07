/**
 * The source code is from react-native-popover,https://github.com/jeanregisser/react-native-popover
 * We modified the style and the how to place the content when placement is "bottom" or "top"
 */
import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  Animated,
  Text,
  TouchableWithoutFeedback,
  View,
  Easing
} from "react-native";

let noop = () => { };


export class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export class Size {
  width: number;
  height: number;
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }
}

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

  }
}

let { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
let DEFAULT_ARROW_SIZE = new Size(10, 8);
let ARROW_MARGIN = 5;

export interface PopoverProps {
  isVisible: boolean;
  onClose?: () => void;
  fromRect: Rect;
  displayArea?: Rect;
  placement?: "auto" | "left" | "right" | "top" | "bottom";
  arrowSize?: Size;
  startCustomAnimation?: () => void;
}

class PopoverBase extends Component<PopoverProps, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      contentSize: {},
      anchorPoint: {},
      popoverOrigin: {},
      placement: "auto",
      isTransitioning: false,
      defaultAnimatedValues: {
        scale: new Animated.Value(0),
        translate: new Animated.ValueXY(),
        fade: new Animated.Value(0),
      },
    };
  }

  static defaultProps = {
    isVisible: false,
    displayArea: new Rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT),
    arrowSize: DEFAULT_ARROW_SIZE,
    placement: "auto",
    onClose: noop,
  };

  measureContent = (x: any) => {
    let { width, height } = x.nativeEvent.layout;
    let contentSize: Size = { width, height };
    let geom = this.computeGeometry({ contentSize });

    let isAwaitingShow = this.state.isAwaitingShow;
    this.setState({
      ...geom,
      contentSize,
      isAwaitingShow: undefined
    }, () => {
      // Once state is set, call the showHandler so it can access all the geometry
      // from the state
      isAwaitingShow && this._startAnimation({ show: true });
    });
  }

  computeGeometry({ contentSize, placement }: { contentSize: Size, placement?: string }) {
    placement = placement || this.props.placement;

    let options = {
      displayArea: this.props.displayArea,
      fromRect: this.props.fromRect,
      arrowSize: this.getArrowSize(placement),
      contentSize,
    };

    switch (placement) {
      case "top":
        return this.computeTopGeometry(options);
      case "bottom":
        return this.computeBottomGeometry(options);
      case "left":
        return this.computeLeftGeometry(options);
      case "right":
        return this.computeRightGeometry(options);
      default:
        return this.computeAutoGeometry(options);
    }
  }

  computeTopGeometry({ displayArea, fromRect, contentSize, arrowSize }: { displayArea: Rect, fromRect: Rect, contentSize: Size, arrowSize: Size }) {
    let positionX: number;

    // 5是不希望popover贴合屏幕边缘
    if (fromRect.x < contentSize.width + 5) {
      positionX = fromRect.x;
    } else {
      positionX = fromRect.x + fromRect.width - contentSize.width;
    }

    let popoverOrigin = new Point(
      positionX,
      fromRect.y - contentSize.height - arrowSize.height - ARROW_MARGIN - 1);

    let anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y - ARROW_MARGIN);

    return {
      popoverOrigin,
      anchorPoint,
      placement: "top",
    };
  }

  computeBottomGeometry({ displayArea, fromRect, contentSize, arrowSize }: { displayArea: Rect, fromRect: Rect, contentSize: Size, arrowSize: Size }) {
    let positionX: number;

    // 5是不希望popover贴合屏幕边缘
    if (fromRect.x < contentSize.width + 5) {
      positionX = fromRect.x;
    } else {
      positionX = fromRect.x + fromRect.width - contentSize.width;
    }

    let popoverOrigin = new Point(
      positionX,
      fromRect.y + fromRect.height + arrowSize.height + ARROW_MARGIN + 1);

    let anchorPoint = new Point(fromRect.x + fromRect.width / 2.0, fromRect.y + fromRect.height + ARROW_MARGIN);

    return {
      popoverOrigin,
      anchorPoint,
      placement: "bottom",
    };
  }

  computeLeftGeometry({ displayArea, fromRect, contentSize, arrowSize }: { displayArea: Rect, fromRect: Rect, contentSize: Size, arrowSize: Size }) {
    let popoverOrigin = new Point(fromRect.x - contentSize.width - arrowSize.width,
      Math.min(displayArea.y + displayArea.height - contentSize.height,
        Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)));
    let anchorPoint = new Point(fromRect.x, fromRect.y + fromRect.height / 2.0);

    return {
      popoverOrigin,
      anchorPoint,
      placement: "left",
    };
  }

  computeRightGeometry({ displayArea, fromRect, contentSize, arrowSize }: { displayArea: Rect, fromRect: Rect, contentSize: Size, arrowSize: Size }) {
    let popoverOrigin = new Point(fromRect.x + fromRect.width + arrowSize.width,
      Math.min(displayArea.y + displayArea.height - contentSize.height,
        Math.max(displayArea.y, fromRect.y + (fromRect.height - contentSize.height) / 2)));
    let anchorPoint = new Point(fromRect.x + fromRect.width, fromRect.y + fromRect.height / 2.0);

    return {
      popoverOrigin,
      anchorPoint,
      placement: "right",
    };
  }

  computeAutoGeometry({ displayArea, contentSize }: { displayArea: Rect, contentSize: Size }) {
    let placementsToTry = ["bottom", "top", "left", "right"];
    let geom: any;

    for (let i = 0; i < placementsToTry.length; i++) {
      let placement = placementsToTry[i];
      geom = this.computeGeometry({ contentSize: contentSize, placement: placement });
      let { popoverOrigin } = geom;

      if (popoverOrigin.x >= displayArea.x
        && popoverOrigin.x <= displayArea.x + displayArea.width - contentSize.width
        && popoverOrigin.y >= displayArea.y
        && popoverOrigin.y <= displayArea.y + displayArea.height - contentSize.height) {
        break;
      }
    }

    return geom;
  }

  getArrowSize(placement: string) {
    let size = this.props.arrowSize;
    switch (placement) {
      case "left":
      case "right":
        return new Size(size.height, size.width);
      default:
        return size;
    }
  }

  getArrowColorStyle(color: string) {
    return { borderTopColor: color };
  }

  getArrowRotation(placement: string) {
    switch (placement) {
      case "bottom":
        return "180deg";
      case "left":
        return "-90deg";
      case "right":
        return "90deg";
      default:
        return "0deg";
    }
  }

  getArrowDynamicStyle() {
    let { anchorPoint, popoverOrigin } = this.state;
    let arrowSize = this.props.arrowSize;

    // Create the arrow from a rectangle with the appropriate borderXWidth set
    // A rotation is then applied dependending on the placement
    // Also make it slightly bigger
    // to fix a visual artifact when the popover is animated with a scale
    let width = arrowSize.width + 2;
    let height = arrowSize.height * 2 + 2;

    return {
      left: anchorPoint.x - popoverOrigin.x - width / 2,
      top: anchorPoint.y - popoverOrigin.y - height / 2,
      width: width,
      height: height,
      borderTopWidth: height / 2,
      borderRightWidth: width / 2,
      borderBottomWidth: height / 2,
      borderLeftWidth: width / 2,
    };
  }

  getTranslateOrigin() {
    let { contentSize, popoverOrigin, anchorPoint } = this.state;
    let popoverCenter = new Point(popoverOrigin.x + contentSize.width / 2,
      popoverOrigin.y + contentSize.height / 2);
    return new Point(anchorPoint.x - popoverCenter.x, anchorPoint.y - popoverCenter.y);
  }

  componentWillReceiveProps(nextProps: any) {
    let willBeVisible = nextProps.isVisible;
    let {
      isVisible,
    } = this.props;

    if (willBeVisible !== isVisible) {
      if (willBeVisible) {
        // We want to start the show animation only when contentSize is known
        // so that we can have some logic depending on the geometry
        this.setState({ contentSize: {}, isAwaitingShow: true });
      } else {
        this._startAnimation({ show: false });
      }
    }
  }

  _startAnimation({ show }: { show: boolean }) {
    let handler = this.props.startCustomAnimation || this._startDefaultAnimation;
    handler({
      show,
      doneCallback: () => this.setState({ isTransitioning: false })
    });

    this.setState({ isTransitioning: true });
  }

  _startDefaultAnimation = ({ show, doneCallback }: { show: boolean, doneCallback: () => void }) => {
    let animDuration = 300;
    let values = this.state.defaultAnimatedValues;
    let translateOrigin = this.getTranslateOrigin();

    if (show) {
      values.translate.setValue(translateOrigin);
    }

    let commonConfig = {
      duration: animDuration,
      easing: show ? Easing.out(Easing.back(0)) : Easing.inOut(Easing.quad),
    };

    Animated.parallel([
      Animated.timing(values.fade, {
        toValue: show ? 1 : 0,
        ...commonConfig,
      })
    ]).start(doneCallback);
  }

  _getDefaultAnimatedStyles() {
    // If there's a custom animation handler,
    // we don't return the default animated styles
    if (typeof this.props.startCustomAnimation !== "undefined") {
      return null;
    }

    let animatedValues = this.state.defaultAnimatedValues;

    return {
      backgroundStyle: {
        opacity: animatedValues.fade,
      },
      arrowStyle: {
        opacity: animatedValues.fade,
      },
      contentStyle: {
        opacity: animatedValues.fade,
      }
    };
  }

  _getExtendedStyles() {
    let background: any[] = [];
    let popover: any[] = [];
    let arrow: any[] = [];
    let content: any[] = [];

    [this._getDefaultAnimatedStyles(), this.props].forEach((source: any) => {
      if (source) {
        background.push(source.backgroundStyle);
        popover.push(source.popoverStyle);
        arrow.push(source.arrowStyle);
        content.push(source.contentStyle);
      }
    });

    return {
      background,
      popover,
      arrow,
      content,
    };
  }

  render() {
    if (!this.props.isVisible && !this.state.isTransitioning) {
      return null;
    }

    let { popoverOrigin, placement } = this.state;
    let extendedStyles = this._getExtendedStyles();
    let contentStyle = [styles.content, ...extendedStyles.content];
    let arrowColor = StyleSheet.flatten(contentStyle).backgroundColor;
    let arrowColorStyle = this.getArrowColorStyle(arrowColor);
    let arrowDynamicStyle = this.getArrowDynamicStyle();
    let contentSizeAvailable = this.state.contentSize.width;

    // Special case, force the arrow rotation even if it was overriden
    let arrowStyle = [styles.arrow, arrowDynamicStyle, arrowColorStyle, ...extendedStyles.arrow];
    let arrowTransform = (StyleSheet.flatten(arrowStyle).transform || []).slice(0);
    arrowTransform.unshift({ rotate: this.getArrowRotation(placement) });
    arrowStyle = [...arrowStyle, { transform: arrowTransform }];

    return (
      <TouchableWithoutFeedback onPress={ this.props.onClose }>
        <View style={ [styles.container, contentSizeAvailable && styles.containerVisible] }>
          <Animated.View style={ [styles.background, ...extendedStyles.background] } />
          <Animated.View style={ [styles.popover, {
            top: popoverOrigin.y,
            left: popoverOrigin.x,
          }, ...extendedStyles.popover] }>
            <Animated.View style={ arrowStyle } />
            <Animated.View ref="content" onLayout={ this.measureContent } style={ contentStyle }>
              { this.props.children }
            </Animated.View>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


let styles = StyleSheet.create({
  container: {
    opacity: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "transparent",
  },
  containerVisible: {
    opacity: 1,
  },
  background: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0)",
  },
  popover: {
    position: "absolute",
  },
  content: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderRadius: 2,
    backgroundColor: "#4e4d4d",
  },
  arrow: {
    position: "absolute",
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
});

export default PopoverBase;