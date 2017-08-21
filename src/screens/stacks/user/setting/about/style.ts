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
        flex: 1,
        backgroundColor: color_background,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
}