import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";
import { Constants, Widgets } from "summer";
let { TabBarIcon } = Widgets;


export default class HomeScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_HOME,
        tabBarLabel: "首页",
        tabBarIcon: <TabBarIcon type="&#xe6d9;"/>
    };

    render() {
        const {
            navigation
        } = this.props as any;
        return (
            <View>
                
            </View>
        );
    }


}