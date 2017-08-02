import { Widgets } from "summer";
let {
    color_background,
    color_theme,
    h_spacing_lg,
    h_spacing_md,
    radius_sm,
    border_width_sm,
    icon_size_xs,
    color_grey,
    h_spacing_sm,
} = Widgets.theme;
export const styles: any = {
    header: {
        backgroundColor: "#FFF"
    },
    container: {
        flex: 1,
        backgroundColor: color_background,
        padding: h_spacing_lg
    },
    item: {
        marginVertical: h_spacing_md,
        paddingHorizontal: h_spacing_sm,
        borderWidth: border_width_sm,
        borderRadius: radius_sm,
        borderColor: color_grey,
        backgroundColor: color_background
    },
    lastItem: {
        marginBottom: h_spacing_md * 2
    },
    input: {
        top: 0
    },
    resetButton: {
        color: color_grey,
        fontSize: icon_size_xs
    },
    button: {
        backgroundColor: color_theme,
    },
    buttonDisable: {
        backgroundColor: color_grey
    },
    timerInfo: {
        minWidth: 46,
        textAlign: "center"
    }
}