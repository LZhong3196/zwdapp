import { Widgets, Constants } from "summer";
const {
    color_theme,
    color_base,
    font_size_base,
    color_background
} = Widgets.theme;
const {
    SCREEN_HEIGHT,
    SCREEN_WIDTH
} = Constants;
export const styles: any = {
    container: {
      flex: 1
    },
    scrollView: {
      width: "100%",
      height: SCREEN_HEIGHT - 50
    },
    content: {
      flexDirection: "row",
    },
    tabWrap: {
      width: SCREEN_WIDTH / 4,
    },
    tabItem: {
      width: "100%",
      height: 40,
      borderBottomWidth: 1,
      borderBottomColor: "#aaa",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      borderLeftWidth: 2,
      borderLeftColor: "#fff"
    },
    currentTab: {
      borderLeftColor: "red",
      backgroundColor: "#bbb"
    },
    detail: {
      width: SCREEN_WIDTH * 3 / 4,
      flexDirection: "row",
      flexWrap: "wrap"
    },
    detailItem: {
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
      width: SCREEN_WIDTH / 4,
      backgroundColor: "#fff",
    },
    detailImage: {
      width: "100%",
      height: 80,
    }
  };