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