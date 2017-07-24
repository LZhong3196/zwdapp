import * as React from "react";
import { connect } from "react-redux";
import * as ReactNavigation from "react-navigation";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import { Root } from "native-base";

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

    constructor(configs: routerConfigs) {
        this.appNavigator = StackNavigator(configs.routeConfigMap, configs.stackConfig);
    }

    public get navigator(): ReactNavigation.NavigationContainer {
        return this.appNavigator;
    }

    // public to() {

    // }

    // public back(){

    // }


    createApp() {
        const mapStateToProps = (state: any) => ({
            nav: state.get("nav").toJS()
        });

        const AppWithNavigationState = (options: appNavigationOptions) => {
            return (
                <Root>
                    <this.appNavigator
                        navigation={
                            addNavigationHelpers({
                                dispatch: options.dispatch,
                                state: options.nav
                            } as any)
                        } />
                </Root>
            );
        };
        return connect(mapStateToProps)(AppWithNavigationState);
    }
}