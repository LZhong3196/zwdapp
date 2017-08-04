import * as React from "react";
import { connect } from "react-redux";
import * as ReactNavigation from "react-navigation";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import Store from "./../store/index";
import {
    ACTIONTYPES_NAVIGATION_TO,
    ACTIONTYPES_NAVIGATION_BACK,
    ACTIONTYPES_NAVIGATION_RESET
} from "./../constants";

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

    /** 转入对应路由 */
    static to(routeName: string, params?: any) {
        Store.dispatch({
            type: ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: routeName,
                params: params
            }
        });
    }
    /** 路由回退 */
    static back() {
        Store.dispatch({
            type: ACTIONTYPES_NAVIGATION_BACK
        });
    }
    /** 路由栈往前重置至目标路由 */
    static reset(routeName?: string, params?: any) {
        Store.dispatch({
            type: ACTIONTYPES_NAVIGATION_RESET,
            meta: {
                routeName: routeName,
                params: params
            }
        });
    }

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