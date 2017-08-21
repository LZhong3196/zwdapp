import { TextStyle, ViewStyle } from "react-native";
import { Widgets } from "summer";
let {
    color_base,
    color_background,
    color_theme,
    font_size_caption,
    font_size_base
} = Widgets.theme;

export const styles: Dictionary<ViewStyle | TextStyle> = {
    header: {
        backgroundColor: "#FFF"
    },
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 40
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
        fontSize: font_size_base,
        textAlign: "center"
    },
    button: {
        backgroundColor: color_theme,
        borderRadius: 0,
        width: "100%"
    }
}