import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

import { Widgets } from "summer";

let { theme } = Widgets;

interface EmptyResultProps {
  title?: string;
  subTitle?: string;
}

const EmptyResult: React.SFC<EmptyResultProps> = ({ title, subTitle }) => {

  return (
    <View style={ styles.container }>
      { title ? <Text style={ styles.title }>{ title }</Text> : null }
      { subTitle ? <Text style={ styles.subTitle }>{ subTitle }</Text> : null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: theme.font_size_base
  },
  subTitle: {
    textAlign: "center",
    color: theme.color_grey,
    fontSize: theme.font_size_base,
    marginTop: 10
  }
});

export default EmptyResult;