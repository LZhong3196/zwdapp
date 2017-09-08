import { PixelRatio, ViewStyle, TextStyle } from "react-native";
import { Widgets } from "summer";
let {
    color_background,
    color_theme,
    h_spacing_lg,
    h_spacing_md,
    radius_lg,
    border_width_sm,
    icon_size_xs,
    color_grey,
    color_base,
    h_spacing_sm,
    font_size_caption_sm,
    font_size_display_lg,
    font_size_display_xl
} = Widgets.theme;
export const styles: Dictionary<ViewStyle | TextStyle> = {
    header: {
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0
    },
    container: {
        backgroundColor: color_background,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent"
    },
    loginButton: {
        backgroundColor: color_theme,
    },
    backgroundImage: {
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        height: "34%"
    },
    itemContainer: {
        borderBottomWidth: 0
    },
    inputItem: {
        backgroundColor: color_background,
        borderWidth: border_width_sm,
        paddingHorizontal: h_spacing_sm
    },
    firstItem: {
        borderTopLeftRadius: radius_lg,
        borderTopRightRadius: radius_lg,
    },
    lastItem: {
        borderTopWidth: 0,
        borderBottomLeftRadius: radius_lg,
        borderBottomRightRadius: radius_lg,
        marginBottom: h_spacing_md
    },
    resetButton: {
        fontSize: icon_size_xs
    },
    helpItemContainer: {
        borderBottomWidth: 0,
        marginLeft: 0
    },
    helpItem: {
        fontSize: font_size_caption_sm,
        color: color_base,
        lineHeight: font_size_display_lg
    }
};

export const thirdParty: any = {
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    optionContainer: {
        width: "60%",
        minWidth: 240,
        borderBottomWidth: 0,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 0,
        marginTop: h_spacing_md
    },
    optionItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        margin: h_spacing_md,
    },
    itemIcon: {
        height: 40,
        borderRadius: 40 / PixelRatio.get(),
        borderWidth: border_width_sm,
        borderColor: "#DDD",
        margin: h_spacing_md
    },
    optionText: {
        fontSize: font_size_caption_sm,
        color: color_base,
        lineHeight: font_size_display_lg,
        textAlign: "center",
    }
};