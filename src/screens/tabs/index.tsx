import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button
} from "react-native";
import { TabNavigator } from "react-navigation";
import { Constants } from "summer";

import HomeScreen from "./home";
import MarketScreen from "./market";
import SearchScreen from "./search";
import OrderScreen from "./order";
import UserScreen from "./user";


const AppTabNavigator = TabNavigator({
    Home: {
        screen: HomeScreen,
    },
    Market: {
        screen: MarketScreen,
    },
    Search: {
        screen: SearchScreen,
    },
    Order: {
        screen: OrderScreen,
    },
    Profile: {
        screen: UserScreen
    }
}, {
    tabBarOptions: {
        activeTintColor: "#F85E3B",
        activeBackgroundColor: "#FFFFFF",
        inactiveTintColor: "#B5B5B5",
        inactiveBackgroundColor: "#FFFFFF",
        labelStyle: {
            marginBottom: 5
        }
    },
    swipeEnabled: true
});

export default class MainScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any,
    };
    render() {
        return (
            <AppTabNavigator />
        );
    }
}
