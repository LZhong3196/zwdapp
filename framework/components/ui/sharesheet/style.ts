import { TextStyle, ViewStyle } from "react-native";
import {
    color_base,
    color_background,
    color_theme,
    color_grey,
    font_size_caption,
    font_size_base,
    v_spacing_md,
    h_spacing_md,
    font_size_caption_sm,
    font_size_display_lg,
    v_spacing_xl,
    border_width_sm
} from "./../theme/index";


export const styles: Dictionary<ViewStyle | TextStyle> = {
    container: {
        paddingVertical: v_spacing_md,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color_background,
        height: 80
    },
    justifyStart: {
        justifyContent: "flex-start",
    },
    title: {
        width: "100%",
        backgroundColor: "#EFEFF5",
        paddingLeft: h_spacing_md,
        height: 26
    },
    titleText: {
        fontSize: font_size_caption_sm,
        color: "#B5B5B5",
        lineHeight: font_size_display_lg
    },
    item: {
        paddingBottom: v_spacing_xl,
        height: 60,
        width: "24%",
        justifyContent: "center"
    },
    itemText: {
        fontSize: font_size_caption_sm,
        color: color_base,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
    },
    buttonContainer: {
        height: 60,
        borderTopColor: color_grey,
        borderTopWidth: border_width_sm,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        color: color_base,
        textAlign: "center"
    }
};

