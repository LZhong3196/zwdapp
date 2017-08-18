import { Widgets,Constants } from "summer";
const {
    color_theme,
    color_base,
    font_size_base,
    color_background
} = Widgets.theme;

export const styles: any = {
    header: {
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
    },
    swiperImage: {
        width: "100%",
        height: 400
    },
    infoContainer: {
        padding: 10,
        backgroundColor: color_background
    },
    leftContainer: {
        flexGrow: 1,
        flexShrink: 1
    },
    rightContainer: {
        width: 60
    },
    titleWrap: {
        height: 40
    },
    goodsTitle: {
        color: color_base,
        fontSize: font_size_base
    },
    themeColor: {
        color: color_theme
    },
    price: {
        fontSize: 20,
        color: color_theme
    },
    grayFont: {
        color: color_base
    },
    tags: {
        backgroundColor: "#fcdf2a",
        height: 12,
        marginTop: 10,
        paddingLeft: 3,
        paddingRight: 3
    },
    tagTitle: {
        fontSize: 8,
        color: "#fff",
        fontWeight: "700",
        lineHeight: 12
    },
    taobaoPrice: {
        fontSize: 12,
        color: "#a1a1a1"
    },
    shareButtonWrap: {
        borderLeftWidth: 1,
        borderLeftColor: "#a1a1a1",
        height: 40
    },
    moreIconWrap: {
        justifyContent: "center",
        paddingTop: 25
    },
    footerButtonText: {
        fontSize: 12
    },
    addToOrder: {
        backgroundColor: color_theme,
        borderRadius: 0
    },
    sendToTaobao: {
        backgroundColor: "#aa8953",
        borderRadius: 0
    },
    marketInfoContainer: {
        marginTop: 10,
        marginBottom: 10,
        height: 100,
        backgroundColor: color_background,
        alignItems: "center"
    },
    marketImage: {
        marginLeft: 10,
        marginRight: 10
    },
    marketNameWrap: {
        height: 20
    },
    marketArea: {
        lineHeight: 16,
        fontSize: 12,
        color: "#828282"
    },
    toMarketButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        borderWidth: 1,
        borderColor: "#a1a1a1",
        height: 20,
        paddingTop: 0,
        paddingBottom: Constants.ios? 1: 5
    },
    toMarketButtonText: {
        color: "#a1a1a1",
        fontSize: 10,
    }
};