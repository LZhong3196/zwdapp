import * as React from "react";
import { TabNavigator } from "react-navigation";
import { Constants, Widgets } from "summer";

import HomeScreen from "./home";
import MarketScreen from "./market";
import SearchScreen from "./search";
import OrderScreen from "./order";
import UserScreen from "./user";

let { theme } = Widgets;

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
            activeTintColor: theme.color_theme,
            activeBackgroundColor: theme.color_background,
            inactiveTintColor: theme.color_base,
            inactiveBackgroundColor: theme.color_background,
            showIcon: true,
            labelStyle: {
                marginBottom: 5
            }
        },
        swipeEnabled: false,
        tabBarPosition: "bottom",
        lazy: true,
        animationEnabled: false,
        backBehavior: "none",
    }
);


export default class MainScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any
    };
    render() {
        return (
            <AppTabNavigator />
        );
    }
}

