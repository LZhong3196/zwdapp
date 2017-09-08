import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import { Widgets } from "summer";

let { Icon } = Widgets;

export interface MenuItemProps {
  icon: string;
  title: string;
  last?: boolean;
  onPress?: () => void;
}

const MenuItem: React.SFC<MenuItemProps> = ({ icon, title, last = false, onPress = () => { } }: { icon: string, title: string, last: boolean, onPress: () => void }) => {
  return (
    <TouchableOpacity onPress={ onPress }>
      <View style={ {
        paddingVertical: 10,
        marginHorizontal: 15,
        borderBottomColor: "#9c9c9c",
        borderBottomWidth: last ? 0 : 0.5,
        flexDirection: "row",
        alignItems: "center"
      } }>
        <Icon type={ icon } color="#fff" />
        <Text style={ {
          color: "#fff",
          fontSize: 16,
          marginLeft: 10
        } }>
          { title }
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuItem;