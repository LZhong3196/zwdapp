import { Widgets } from "summer";
let {
    color_background,
    color_theme,
    color_base,
    font_size_base,
    font_size_caption,
    font_size_heading
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
        height: 180,
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
        height: 80,
    },
    titleText: {
        color: color_background,
        textAlign: "center"
    },
    titleRight: {
        position: "absolute",
        right: 0,
    },
    caption: {
        padding: 20,
        paddingTop: 80,
        justifyContent: "center",
        alignItems: "center"
    },
    avatarContainer: {
        width: 70
    },
    avatar: {
        borderWidth: 2,
        borderColor: color_background
    },
    userName: {
        color: color_background,
        fontSize: 22,
        backgroundColor: "transparent",
    }
};

export const menuStyle: any = {
    container: {
        paddingVertical: 15,
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: color_background,
        height: 90
    },
    title: {
        width: "100%",
        backgroundColor: "#EFEFF5",
        paddingLeft: 10,
        height: 26
    },
    titleText: {
        fontSize: 13,
        color: "#B5B5B5",
        lineHeight: 24
    },
    item: {
        paddingBottom: 20,
        height: 60,
    },
    itemText: {
        fontSize: 12,
        color: color_base,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: "center",
    }

};
