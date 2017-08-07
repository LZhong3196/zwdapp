import { Constants } from "summer";
const { SCREEN_HEIGHT, SCREEN_WIDTH } = Constants;
export const styles: any = {
    swiperItem: {
        width: "100%",
        height: 150
    },
    activeDotColor: {
        backgroundColor: "transparent",
        borderColor: "red",
        borderWidth: 1
    },
    title: {
        flexDirection: "row",
        height: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    titleLine: {
        height: 1,
        width: 60,
        backgroundColor: "#838383"
    },
    headerImage: {
        width: "100%",
        height: 100
    },
    RecommendGoodsListScroll: {
        height: 310,
        paddingTop: 10,
        paddingLeft: 10
    },
    RecommendGoodsListImage: {
        width: 150,
        height: 300,
        marginRight: 10
    },
    hotSellListWrap: {
        flexDirection: "row",
        flexWrap: "wrap",
        height: 410,
        width: "100%",
        paddingTop: 10,
    },
    hotSellListImage: {
        width: SCREEN_WIDTH / 3,
        height: 200
    },
    dailyNewListScroll: {
        paddingBottom: 10
    },
    dailyNewListImage: {
        width: 250,
        height: 400,
        marginLeft: 10
    },
    advertListContainer: {
        marginTop: 10,
        height: 600,
        flexDirection: "row",
        flexWrap: "wrap"
    },
    advertListItem: {
        height: 300,
        padding: 5
    },
    advertListImage: {
        width: "100%",
        height: 200
    },
    price: {
        color: "red"
    }
};
