import { Widgets } from "summer";
const { theme: {
    color_grey,
    color_theme
} } = Widgets;
export const styles: any = {
    header: {
        justifyContent: "center",
        alignItems: "center"
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
    searchButton: {
        height: 30,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: color_theme
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
    },
    clearSearchHistory: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    }
};