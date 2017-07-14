import * as React from "react";
import {
    Text
} from "react-native";
import * as Lodash from "lodash";

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
        color: "#000",
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
        const TextIconStyle: any = Lodash.assign({
            fontSize,
            color: color,
            fontFamily: "iconfont",
            flexDirection: "row"
        }, style);

        return (
            <Text style={TextIconStyle}>{type}</Text>
        );
    }
}