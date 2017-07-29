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
    font_size_display_lg
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
    container: {
        backgroundColor: color_background,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: 40,
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
        color: color_grey,
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