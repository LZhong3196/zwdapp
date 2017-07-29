import { Platform } from "react-native";
import {
    font_size_base,
    font_size_caption_sm,
    color_background,
    overlay_color,
    v_spacing_md,
    icon_size_lg
} from "./../theme/index";

export const style: any = {
    toast: {
        backgroundColor: overlay_color,
        borderRadius: Platform.OS === "ios" ? 5 : 0,
        paddingHorizontal: 15,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: v_spacing_md
    },
    text: {
        color: color_background,
        textAlign: "center",
        fontSize: font_size_base,
    },
    button: {
        backgroundColor: "transparent",
        height: 30,
        elevation: 0,
    },
    buttonText: {
        fontSize: font_size_base
    },
    icon: {
        fontSize: icon_size_lg,
        color: color_background,
        margin: v_spacing_md,
    }
};