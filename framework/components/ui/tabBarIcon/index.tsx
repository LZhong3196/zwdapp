import * as React from "react";
import {
    View,
    Text
} from "react-native";

const sizeMap: any = {
    "xs": 18 as number,
    "md": 22 as number,
    "lg": 36 as number
};

export interface TabBarIconProps {
    type: string;
    color?: string;
    focused?: boolean;
    size?: "xs" | "md" | "lg" | number;
    activeColor?: string;
    style?: any;
}

export default class TabBarIcon extends React.Component<TabBarIconProps, any> {
    static defaultProps = {
        size: "md",
        color: "#BFBFBF",
        focused: false,
        activeColor: "#F85E3B",
    };



    render() {
        const {
            type,
            size,
            focused,
            color,
            activeColor,
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

        return (
            <Text style={TextIconStyle}  {...restProps}>
                {type}
            </Text>
        );
    }
}