import * as React from "react";
import ReactNavigation, { TabNavigator } from "react-navigation";
import { Widgets } from "summer";

import HomeScreen from "./home";
import MarketScreen from "./market";
import SearchScreen from "./search";
import OrderScreen from "./order";
import UserScreen from "./user";

import { TabRouteMap } from "./../../router";

let { theme } = Widgets;

export default class MainScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any
    };
    private AppTabNavigator: ReactNavigation.NavigationContainer;
    private routeConfigs: ReactNavigation.NavigationRouteConfigMap;
    private config: ReactNavigation.TabNavigatorConfig;
    constructor(props: any, context: any) {
        super(props, context);
        this.routeConfigs = {
            [TabRouteMap.ROUTES_TAB_HOME]: { screen: HomeScreen },
            [TabRouteMap.ROUTES_TAB_MARKET]: { screen: MarketScreen },
            [TabRouteMap.ROUTES_TAB_SEARCH]: { screen: SearchScreen },
            [TabRouteMap.ROUTES_TAB_ORDER]: { screen: OrderScreen },
            [TabRouteMap.ROUTES_TAB_USER]: { screen: UserScreen }
        };
        this.config = {
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
            animationEnabled: false
        };
        this.AppTabNavigator = TabNavigator(this.routeConfigs, this.config);
    }
    render() {
        return (
            <this.AppTabNavigator />
        );
    }
}

