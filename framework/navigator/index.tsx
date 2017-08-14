import * as React from "react";
import { connect } from "react-redux";
import ReactNavigation, { NavigationActions } from "react-navigation";
import { addNavigationHelpers, StackNavigator } from "react-navigation";
import Store from "./../store/index";
import {
    ACTIONTYPES_NAVIGATION_TO,
    ACTIONTYPES_NAVIGATION_BACK,
    ACTIONTYPES_NAVIGATION_RESET,
    ACTIONTYPES_NAVIGATION_BACKTO,
    ROUTES_MAIN
} from "./../constants";

type appNavigationOptions = {
    dispatch: any;
    nav: any;
};

export type RouterConfigs = {
    routeConfigMap: ReactNavigation.NavigationRouteConfigMap,
    stackConfig?: ReactNavigation.StackNavigatorConfig,
    TabRouteMap: HashMap<string>
};

export type TabNavigation = ReactNavigation.NavigationProp<any, ReactNavigation.NavigationAction>;

export default class Navigator {
    public appName: string;
    public appNavigator: ReactNavigation.NavigationContainer;
    static routes: HashMap<string> = {};
    static tabs: Array<string> = [];
    static navigatorInstance: ReactNavigation.NavigationContainer;
    static tabNavigation: TabNavigation;

    static initRoutes(config: RouterConfigs) {
        for (const key in config.TabRouteMap) {
            this.routes[key] = config.TabRouteMap[key];
            this.tabs = [ config.TabRouteMap[key], ...this.tabs ];
        }
        for (const key in config.routeConfigMap) {
            this.routes[key.toUpperCase()] = key;
        }
    }

    static initTabNavigation(instance: TabNavigation) {
        this.tabNavigation = instance;
    }

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
    static back(routeName?: string) {
        if (!routeName) {
            Store.dispatch({
                type: ACTIONTYPES_NAVIGATION_BACK,
            });
        }
        else {
            Store.dispatch({
                type: ACTIONTYPES_NAVIGATION_BACKTO,
                meta: {
                    routeName: routeName
                }
            });
        }
    }

    /** 回退至首页特定tab页 */
    static backToTab(target: string, params?: any) {
        Store.dispatch({
            type: ACTIONTYPES_NAVIGATION_BACKTO,
            meta: {
                routeName: ROUTES_MAIN
            }
        });
        if (!!this.tabNavigation && this.tabs.indexOf(target) !== -1) {
            let res: any = this.tabNavigation.dispatch(
                NavigationActions.navigate({
                    routeName: target,
                    params: params
                })
            );
            if (!res) {
                this.tabNavigation = undefined;
            }
        }
    }

    /** [Deprecated] 路由栈往前重置至目标路由 */
    static reset(routeName?: string, params?: any) {
        this.back(ROUTES_MAIN);
        // Store.dispatch({
        //     type: ACTIONTYPES_NAVIGATION_RESET,
        //     meta: {
        //         params: params
        //     }
        // });
    }

    constructor(configs: RouterConfigs) {
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
