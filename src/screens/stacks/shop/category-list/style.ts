import {
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";

import { Widgets } from "summer";

let { theme } = Widgets;

const styles = {
  container: {
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    width: "100%",
    height: Dimensions.get("window").height
  },
  header: {
    marginLeft: 0,
    paddingLeft: 10
  },
  headerText: {
    fontSize: 16
  },
  categoryItem: {
    marginLeft: 0,
    paddingLeft: 10,
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 12
  },
  childText: {
    paddingLeft: 12,
    color: theme.color_base
  }
};

export default styles;