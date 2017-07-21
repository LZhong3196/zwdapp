import { Widgets } from "summer";
let {
    color_background,
    color_base,
    color_theme,
    font_family_base,
    font_size_base,
    font_size_heading
} = Widgets.theme;


export const styles: any = {
    view: {
        flex: 1
    },
    container: {
        backgroundColor: color_background,
        marginLeft: 0,
        paddingLeft: 8,
        zIndex: 10
    },
    itemImage: {
        backgroundColor: color_base,
    },
    itemTitle: {
        fontSize: font_size_heading,
        backgroundColor: color_background,
        color: "#000"
    },
    itemIntro: {
        backgroundColor: color_background,
        fontSize: font_size_base
    },
    scrollToTop: {
        backgroundColor: color_theme,
        // bottom: 40,
        // right: 20
        // height: 20,
        // width: 20,
    }
};
