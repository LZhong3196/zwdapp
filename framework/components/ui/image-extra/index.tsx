import * as React from "react";
import {
    Image,
    ImageProperties,
    ImageURISource
} from "react-native";


const qualityMap: Dictionary<string> = {
    XXXS: "60x60",
    XXS: "80x80",
    XS: "100x100",
    SM: "120x120",
    MD: "160x160",
    LG: "180x180",
    XL: "200x200",
    XXL: "220x220",
    XXXL: "310x310",
    XXXXL: "400x400",
};

export interface ImageExtraProps extends ImageProperties {
    qualityControl?:
    "60x60"
    | "80x80" | "100x100" | "120x120" | "160x160" | "180x180"
    | "200x200" | "220x220" | "310x310" | "400x400"
    | "XXXS" | "XXS" | "XS" | "SM" | "MD"
    | "LG" | "XL" | "XXL" | "XXXL" | "XXXXL";
}

export default class ImageExtra extends React.Component<ImageExtraProps, any> {
    static defaultProps = {
        qualityControl: ""
    }

    constructor(props: ImageExtraProps, context: any) {
        super(props, context);

    }

    render() {
        const connectivityLimited: boolean = !!(global as any).__CONNECT_LIMIT__ && (global as any).__NETINFO__ !== "WIFI";

        const {
            qualityControl,
            source,
            ...restProps
        } = this.props;

        const quality: string = qualityMap[qualityControl] || qualityControl;
        const onResponse: boolean = connectivityLimited && !!quality;

        let imageSource: ImageURISource | ImageURISource[] = onResponse ? {
            ...source,
            uri: `${source}_${quality}.jpg`
        } : source;

        return (
            <Image source={imageSource} {...restProps} />
        );
    }
}