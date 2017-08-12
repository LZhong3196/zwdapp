import { Constants, Widgets } from "summer";
const {
    SCREEN_HEIGHT,
    SCREEN_WIDTH,
    ios
} = Constants;
const { theme: {
    color_base,
    color_theme,
    color_background,
    color_grey,
    mask_color
}} = Widgets;
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        marginTop: ios ? 20 : 0,
        height: 50,
        alignItems: "center",
        backgroundColor: color_background,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa"
    },
    cityButton: {
      flexDirection: "row"
    },
    inputWrap: {
        flexDirection: "row",
        flexGrow: 1,
        flexShrink: 1,
        alignItems: "center",
        backgroundColor: color_grey,
        height: 30
    },
    inputText: {
        lineHeight: 20,
    },
    city: {
        color: color_base
    },
    moreCity: {
        fontSize: 10
    },
    input: {
        flexGrow: 1,
        flexShrink: 1,
        padding: 0,
        fontSize: 12,
    },
    cover: {
        height: ios ? (SCREEN_HEIGHT - 70) : (SCREEN_HEIGHT - 50),
        marginTop: ios ? 70 : 50,
        backgroundColor: mask_color,
    },
    cityWrap: {
        flexDirection: "row" ,
        flexWrap: "wrap",
        alignContent: "space-between",
        borderTopWidth: 1,
        backgroundColor: color_grey,
        borderColor: "#aaa",
        paddingLeft: 10,
        paddingTop: 10
    },
    cityItem: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#aaa",
        marginRight: 10,
        marginBottom: 10,
        width: (SCREEN_WIDTH - 50) / 4,
        height: 30
    },
    selectedCity: {
        backgroundColor: color_theme
    },
});