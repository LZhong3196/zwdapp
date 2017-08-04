import { Widgets } from "summer";
let {
    color_background,
    color_theme,
    color_base,
    color_grey,
    font_size_base,
    font_size_caption,
    font_size_heading,
    h_spacing_lg,
    font_size_display_md,
    border_width_lg,
    v_spacing_md,
    v_spacing_xl,
    h_spacing_md,
    font_size_caption_sm,
    font_size_display_lg
} = Widgets.theme;


export const styles: any = {
    view: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    scrollView: {
        backgroundColor: "transparent"
    },
    container: {
        flex: 1,
        backgroundColor: "transparent"
    },
    backgroundImage: {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    },
    grid: {
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: color_background,
        flex: 1
    },
};

export const headerStyle: any = {
    container: {
        height: 170,
    },
    background: {
        position: "absolute",
        backgroundColor: color_theme,
        zIndex: -1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    backgroundImage: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    title: {
        position: "absolute",
        backgroundColor: "transparent",
        zIndex: 100,
        top: 0,
        left: 0,
        right: 0,
        height: 80
    },
    titleLeft: {
        position: "absolute",
        left: h_spacing_lg
    },
    titleLeftText: {
        color: color_background,
        fontSize: font_size_caption
    },
    titleText: {
        color: color_background,
        textAlign: "center"
    },
    titleRight: {
        position: "absolute",
        right: h_spacing_lg,
    },
    caption: {
        padding: h_spacing_lg,
        paddingTop: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    avatarContainer: {
        width: 70
    },
    avatar: {
        borderWidth: border_width_lg,
        borderColor: color_background,
        backgroundColor: color_background
    },
    userName: {
        color: color_background,
        fontSize: font_size_display_md,
        backgroundColor: "transparent",
    }
};

export const menuStyle: any = {
    container: {
        paddingVertical: v_spacing_md,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: color_background,
        height: 80,
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
        width: "20%",
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
    }

};
