import * as React from "react";
import {
    Text,
    View,
    Platform,
    ViewStyle
} from "react-native";

const sizeMap: any = {
    "xs": 18 as number,
    "md": 22 as number,
    "lg": 36 as number
};

export interface IconStyleProps extends ViewStyle {
    color?: string;
    fontSize?: number;
    lineHeight?: number;
};

export interface IconProps {
    type: string;
    size?: 'xxs' | 'xs' | 'md' | 'lg' | number;
    color?: string;
    style?: IconStyleProps;
    onPress?: (e?: any) => void;
}


export default class Icon extends React.Component<IconProps, any> {
    static defaultProps = {
        size: "md",
        color: "#F85E3B",
        style: {}
    };

    render() {
        const {
            type,
            size,
            color,
            style,
            onPress
        } = this.props;
        const fontSize: number = typeof size === "string" ? sizeMap[size] : size;
        const TextIconStyle: any = {
            fontSize,
            color: style.color || color,
            fontFamily: "iconfont",
            textAlignVertical: "center",
            textAlign: "center"
        };
        delete style.fontSize;
        delete style.color;
        delete style.lineHeight;
        const ContainerStyle: any = {
            height: this.getHeight(style, fontSize),
            width: this.getHeight(style, fontSize),
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            ...style
        };
        let unicode: string = this.unicodeParser(type);
        return (
            <View style={ContainerStyle}>
                {!!onPress ? (
                    <Text
                        onPress={(e?: any) => onPress && onPress(e)}
                        style={TextIconStyle}>{unicode}
                    </Text>
                ) : (
                    <Text style={TextIconStyle}>{unicode} </Text>
                )}
            </View>
        );
    }

    getHeight = (style: any, fontSize: number): number => {
        return (style.lineHeight || style.height || fontSize) + (style.borderWidth || 0) * 2;
    };

    unicodeParser = (value: string): string => {
        return value.length > 1 ? `${String.fromCharCode(parseInt(value.replace(/(&#x)|;/g, ""), 16))}` : value;
    };
}