import { Widgets, Constants } from "summer";
const { theme: {
    color_grey,
    color_theme
} } = Widgets;
const { ios } = Constants;
export const styles: any = {
    header: {
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        zIndex: 1
    },
    inputWrap: {
        flexDirection: "row",
        flexGrow: 1,
        flexShrink: 1,
        alignItems: "center",
        backgroundColor: color_grey,
        height: 30
    },
    input: {
        flexGrow: 1,
        flexShrink: 1,
        padding: 0,
        fontSize: 12,
    },
    searchSelect: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: "gray",
        marginRight: 5
    },
    searchOptions: {
        position: "absolute",
        top: ios ? 55 : 35,
        left: 32,
        backgroundColor: "#f1f1f1"
    },
    searchButton: {
        height: 30,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: color_theme
    },
    hotSearch: {

    },
    hotSearchList: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 10,
        paddingBottom: 10
    },
    hotSearchTitle: {
        justifyContent: "center"
    },
    hotSearchItem: {
        marginLeft: 10,
        height: 30
    },
    titleIcon: {
        paddingTop: 10
    }
};