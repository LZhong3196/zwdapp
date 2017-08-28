import * as React from "react";
import {
    View,
    Text,
    ViewStyle,
    TextStyle,
    ViewProperties
} from "react-native";

export interface DividerProps extends ViewProperties {
    width?: number | string;
    title: string;
    color?: string;
    fontSize?: number;
    style?: ViewStyle;
}

export default class Divider extends React.Component<DividerProps, any> {
    static defaultProps = {
        width: "100%",
        color: "#bfbfbf",
        fontSize: 12
    };

    render() {
        let { width, title, color, fontSize, style } = this.props as any;

        if (style) {
            delete style.width;
            delete style.justifyContent;
            delete style.alignItems;
        }

        const containerStyle: ViewStyle = {
            width,
            justifyContent: "center",
            alignItems: "center",
            ...style
        };

        const titleStyle: TextStyle = {
            fontSize: fontSize,
            color,
            backgroundColor: "#fff",
            paddingHorizontal: 5,
        };

        const lineStyle: ViewStyle = {
            height: 0.5,
            position: "absolute",
            width,
            zIndex: -1,
            backgroundColor: color
        };

        return (
            <View style={containerStyle}>
                <Text style={titleStyle}>{title}</Text>
                <View style={lineStyle}></View>
            </View>
        );
    }
};