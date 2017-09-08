import { TextStyle, ViewStyle } from "react-native";
import { Widgets } from "summer";
let {
    color_base,
    color_background,
    color_theme,
    font_size_caption,
    font_size_base,
    v_spacing_md,
    h_spacing_md,
    font_size_caption_sm,
    font_size_display_lg,
    v_spacing_xl
} = Widgets.theme;

export const styles: Dictionary<ViewStyle | TextStyle> = {
    header: {
        backgroundColor: "#FFF"
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: "20%"
    },
    content: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    qrcode: {
        height: 200,
        width: null,
        flex: 1
    },
    infoText: {
        color: color_base,
        fontSize: font_size_caption_sm,
        textAlign: "center"
    },
    button: {
        backgroundColor: color_theme,
        borderRadius: 0,
        width: "100%"
    }
};
