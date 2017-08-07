import { Constants } from "summer";
const { SCREEN_WIDTH, SCREEN_HEIGHT } = Constants;
export const styles: any = {
    container: {
        flex: 1,
        flexWrap: "wrap",
    },
    listItem: {
        padding: 10,
        flexDirection: "row",
        backgroundColor: "#fff"
    },
    listItemSide: {
        padding: 10,
        width: SCREEN_WIDTH / 2,
        height: 230,
        backgroundColor: "#fff"
    },
    goodsPic: {
        width: 150,
        height: 150,
    },
    goodsDetail: {
        flexShrink: 1,
        flexGrow: 1,
        paddingLeft: 10,
        justifyContent: "space-between",
    },
    titleWrap: {
        flexDirection: "row",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333"
    },
    share: {
        position: "absolute",
        right: 0,
        bottom: 0,
    },
    redFont: {
        color: "red"
    },
    iconfont: {
        fontFamily: "iconfont",
        lineHeight: 12
    }
};
