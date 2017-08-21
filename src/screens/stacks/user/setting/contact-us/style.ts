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
    listContainer: {
        backgroundColor: "#FFF"
    },
    listItem: {
        height: 50,
    },
    lastItem: {
        borderBottomWidth: 0
    },
    itemRight: {
        flexGrow: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    rightText: {
        fontSize: font_size_base,
        color: color_base,
    },
    rightInfo: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        alignItems: 'center'
    }
}