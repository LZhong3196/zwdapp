import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";
import { Constants, Widgets } from "summer";

let { TabBarIcon } = Widgets;

export default class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_SEARCH,
        tabBarLabel: "搜款式",
        tabBarIcon: <TabBarIcon type="&#xe656;"/>
    };

    render() {
        const {
            navigation
        } = this.props as any;
        return (
            <View>
                <Text>
                    Search
                </Text>
            </View>
        );
    }
}