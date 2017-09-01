import { Widgets } from "summer";

let { theme } = Widgets;

const styles: any = {
  listGroup: {
    backgroundColor: "#fff",
    marginTop: 15,
    borderTopWidth: 0.5,
    borderColor: "#c9c9c9"
  },
  listGroupLast: {
    marginBottom: 20
  },
  summaryGroup: {
    borderBottomWidth: 0.5,
    paddingVertical: 13,
    flexDirection: "row",
    paddingLeft: 15,
    paddingRight: 10
  },
  summaryContent: {
    flex: 1,
    marginHorizontal: 10,
    paddingTop: 5,
    justifyContent: "space-between"
  },
  btnFavBase: {
    height: 24,
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: "center",
  },
  btnFav: {
    backgroundColor: theme.color_theme,
    borderColor: theme.color_theme
  },
  btnUnFav: {
    backgroundColor: theme.color_grey,
    borderColor: theme.color_grey
  },
  btnFavText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 2
  },
  tagGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 10,
    marginTop: 2,
    padding: 2,
    borderWidth: 1,
    borderColor: theme.color_theme,
    borderRadius: 4,
    flexDirection: "row"
  },
  tagText: {
    color: theme.color_theme,
    fontSize: 12
  },
  shopTitle: {
    fontSize: 16
  },
  itemLeft: {
    flexDirection: "row"
  },
  itemName: {
    color: theme.color_base,
    marginRight: 20
  },
  itemContent: {
    color: theme.color_base,
  },
  footer: {
    backgroundColor: "transparent",
    borderTopWidth: 0
  },
  footerBtn: {
    height: 35,
    paddingTop: 0,
    paddingBottom: 0,
    alignSelf: "center",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: theme.color_theme,
    borderColor: theme.color_theme
  },
  footerBtnText: {
    color: "#fff"
  },
  highlight: {
    color: theme.color_theme
  }
};

export default styles;
