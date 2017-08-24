import React from "react";
import { View, Text, ViewStyle } from "react-native";

interface DividerProps {
  width?: number | string;
  title: string;
  color?: string;
  fontSize?: number;
  style?: ViewStyle;
}

const Divider: React.SFC<DividerProps> = (props) => {

  let { width, title, color, fontSize, style } = props;

  if (style) {
    delete style.width;
    delete style.justifyContent;
    delete style.alignItems;
  }

  const containerStyle: any = {
    width,
    justifyContent: "center",
    alignItems: "center",
    ...style
  };

  const titleStyle: any = {
    fontSize,
    color,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
  };

  const lineStyle: any = {
    height: 0.5,
    position: "absolute",
    width,
    zIndex: -1,
    backgroundColor: color
  };

  return (
    <View style={ containerStyle }>
      <Text style={ titleStyle }>{ props.title }</Text>
      <View style={ lineStyle }></View>
    </View>
  );
};

Divider.defaultProps = {
  width: "100%",
  color: "#bfbfbf",
  fontSize: 12
};

export default Divider;