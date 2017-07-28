import * as React from "react";
import {
    Text,
    Platform
} from "react-native";

const sizeMap: any = {
    "xs": 18 as number,
    "md": 22 as number,
    "lg": 36 as number
};

export interface IconProps {
    type: string;
    size?: 'xxs' | 'xs' | 'md' | 'lg' | number;
    color?: string;
    style?: any;
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
            style
        } = this.props;
        const fontSize: number = typeof size === "string" ? sizeMap[size] : size;
        const TextIconStyle: any = {
            fontSize,
            color: color,
            fontFamily: "iconfont",
            flexDirection: "row",
            textAlignVertical: "center",
            marginBottom: this.getMarginBottom(style, fontSize),
            ...style
        };
        let unicode: string = this.unicodeParser(type);
        return (
            <Text style={TextIconStyle}>{unicode}</Text>
        );
    }

    getMarginBottom = (style: any = {}, fontSize: number): number => {
        /** set text align veritical center */
        if (Platform.OS !== "ios") {
            return style.marginBottom || style.margin;
        }
        let bottom: number = style.marginBottom || style.margin || 0;
        return bottom - (fontSize / 8);
    }

    unicodeParser = (value: string): string => {
        return value.length > 1 ? `${String.fromCharCode(parseInt(value.replace(/(&#x)|;/g, ""), 16))}` : value;
    };
}