import { Widgets, Constants } from "summer";
const { theme: {
    color_grey,
    color_theme,
    color_background
} } = Widgets;
const { ios } = Constants;
export const styles: any = {
    header: {
        flexDirection: "row",
        marginTop: ios ? 20 : 0,
        height: 50,
        alignItems: "center",
        backgroundColor: color_background,
        borderBottomWidth: 1,
        borderBottomColor: "#aaa",
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
        marginLeft: 5,
        flexGrow: 1,
        flexShrink: 1,
        padding: 0,
        fontSize: 12
    },
    searchSelect: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 30,
        paddingLeft: 5,
        paddingRight: 5,
        borderRightWidth: 1,
        borderRightColor: "gray"
    },
    selectBotton: {
        flexDirection: "row",
        alignItems: "center"
    },
    searchOptions: {
        position: "absolute",
        top: 30,
        left: 0,
        backgroundColor: "#f1f1f1",
    },
    selectedOption: {
      opacity: 0.3
    },
    searchButton: {
        height: 30,
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: color_theme,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3
    },
    searchButtonText: {
        color: "#fff"
    },
    hotSearch: {
        zIndex: 0
    },
    hotSearchList: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingTop: 10,
        paddingBottom: 10
    },
    hotSearchTitle: {
        flexDirection: "row",
        alignItems: "center"
    },
    hotSearchItem: {
        marginLeft: 10,
        height: 30
    }
};