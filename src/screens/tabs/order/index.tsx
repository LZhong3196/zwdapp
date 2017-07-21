import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";
import { Constants, Widgets } from "summer";

let { TabBarIcon } = Widgets;


export default class OrderScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_ORDER,
        tabBarLabel: "采购单",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe615;"
                activeType="&#xe6c8;"
                focused={options.focused} />
        )
    };

    render() {
        const {
            navigation
        } = this.props as any;
        return (
            <View>
                <Text>
                    Order
                </Text>
            </View>
        );
    }
}