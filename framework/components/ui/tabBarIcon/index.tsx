import * as React from "react";
import {
    Text
} from "react-native";

const sizeMap: any = {
    "xs": 18 as number,
    "md": 22 as number,
    "lg": 36 as number
};

export interface TabBarIconProps {
    type: string;
    size?: "xs" | "md" | "lg" | number;
}

export default class TabBarIcon extends React.Component<TabBarIconProps, any> {
    static defaultProps = {
        size: "md",
        color: "#000"
    };

    render() {
        const { type, size } = this.props;
        const fontSize: number = typeof size === "string" ? sizeMap[size] : size;
        const TextIconStyle: any = {
            fontSize,
            fontFamily: "iconfont",
            flexDirection: "row"
        };

        return (
            <Text style={TextIconStyle}>{type}</Text>
        );
    }
}