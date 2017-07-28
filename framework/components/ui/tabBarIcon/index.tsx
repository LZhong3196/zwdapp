import * as React from "react";
import {
    View,
    Text
} from "react-native";
import * as variables from "./../theme/index";

const sizeMap: any = {
    "xs": 18 as number,
    "md": 22 as number,
    "lg": 36 as number
};

export interface TabBarIconProps {
    type: string;
    focused?: boolean;
    color?: string;
    size?: "xs" | "md" | "lg" | number;
    activeColor?: string;
    activeType?: string;
    style?: any;
}

export default class TabBarIcon extends React.Component<TabBarIconProps, any> {
    static defaultProps = {
        size: "md",
        color: variables.color_base,
        activeColor: variables.color_theme,
        focused: false,
    };

    render() {
        const {
            type,
            size,
            focused,
            color,
            activeColor,
            activeType,
            style,
            ...restProps
        } = this.props;
        const fontSize: number = typeof size === "string" ? sizeMap[size] : size;

        const TextIconStyle: any = {
            ...style,
            fontSize,
            fontFamily: "iconfont",
            flexDirection: "row",
            color: focused ? activeColor : color
        };
        let unicode: string = this.unicodeParser(focused ? activeType : type);
        return (
            <Text style={TextIconStyle}  {...restProps}>
                {unicode}
            </Text>
        );
    }
    unicodeParser = (value: string): string => {
        return value.length > 1 ? `${String.fromCharCode(parseInt(value.replace(/(&#x)|;/g, ""), 16))}` : value;
    };
}