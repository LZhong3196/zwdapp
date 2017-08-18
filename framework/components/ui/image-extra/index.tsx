import * as React from "react";
import {
    CachedImage,
    CachedImageProps,
    CachedImageURISource
} from "react-native-img-cache";

const IS_DEV = (global as any).__DEV__;
const IS_DEBUG = (global as any).__DEBUG__;
const isDebugging: boolean = IS_DEBUG || IS_DEV;

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

export interface ImageExtraProps extends CachedImageProps {
    source: CachedImageURISource;
    qualityControl?:
    "60x60"
    | "80x80" | "100x100" | "120x120" | "160x160" | "180x180"
    | "200x200" | "220x220" | "310x310" | "400x400"
    | "XXXS" | "XXS" | "XS" | "SM" | "MD"
    | "LG" | "XL" | "XXL" | "XXXL" | "XXXXL";
}

export default class ImageExtra extends React.Component<ImageExtraProps, any> {
    private NETINFO = (global as any).__NETINFO__;
    private CONNECT_LIMIT = (global as any).__CONNECT_LIMIT__;
    static defaultProps = {
        qualityControl: "",
    };

    constructor(props: ImageExtraProps, context: any) {
        super(props, context);
    }

    render() {
        const connectivityLimited: boolean = !!this.CONNECT_LIMIT && this.NETINFO !== "WIFI";
        const {
            qualityControl,
            source,
            ...restProps
        } = this.props;

        const quality: string = qualityMap[qualityControl] || qualityControl;
        let imageSource: CachedImageURISource = source;
        if (!!source.uri && connectivityLimited && !!quality) {
            const splashReg: RegExp = /\/(\d{3,4})/g;
            let uriResponse: string = isDebugging ? source.uri.replace(splashReg, `/100`) : `${source.uri}_${quality}.jpg`;
            imageSource = {
                ...source,
                uri: uriResponse
            };
        }
        return (
            <CachedImage source={imageSource} {...restProps}/>
        );
    }
}