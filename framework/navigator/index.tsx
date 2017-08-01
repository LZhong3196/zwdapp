import * as React from "react";
import { connect } from "react-redux";
import * as ReactNavigation from "react-navigation";
import { addNavigationHelpers, StackNavigator } from "react-navigation";

type appNavigationOptions = {
    dispatch: any;
    nav: any;
};

export type routerConfigs = {
    routeConfigMap: ReactNavigation.NavigationRouteConfigMap,
    stackConfig?: ReactNavigation.StackNavigatorConfig,
};

export default class Navigator {
    public appName: string;
    public appNavigator: ReactNavigation.NavigationContainer;
    static navigatorInstance: ReactNavigation.NavigationContainer;

    constructor(configs: routerConfigs) {
        this.appNavigator = StackNavigator(configs.routeConfigMap, configs.stackConfig);
    }

    public get navigator(): ReactNavigation.NavigationContainer {
        return this.appNavigator;
    }

    createApp() {
        const mapStateToProps = (state: any) => ({
            nav: state.get("nav").toJS()
        });

        const AppWithNavigationState = (options: appNavigationOptions) => {
            return (
                <this.appNavigator
                    navigation={
                        addNavigationHelpers({
                            dispatch: options.dispatch,
                            state: options.nav
                        } as any)
                    } />
            );
        };
        return connect(mapStateToProps)(AppWithNavigationState);
    }
}