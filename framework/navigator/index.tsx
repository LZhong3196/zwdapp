import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
    NavigationActions,
    addNavigationHelpers,
    StackNavigator,
    NavigationRouteConfigMap,
    StackNavigatorConfig,
    NavigationProp,
    NavigationAction,
    NavigationContainer
} from "react-navigation";
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
    routeConfigMap: NavigationRouteConfigMap,
    stackConfig?: StackNavigatorConfig,
    TabRouteMap: RouteMap<string>
};

export type TabNavigation = NavigationProp<any, NavigationAction>;

export default class Navigator {
    public appName: string;
    public appNavigator: NavigationContainer;
    static routes: RouteMap<string> = {};
    static tabs: Array<string> = [];
    static navigatorInstance: NavigationContainer;
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

    static connectTabNavigation(): ClassDecorator {
        return (DecoratorComponent: any) => {
            let willMount: () => void = DecoratorComponent.prototype.componentWillMount;
            let willUnmount: () => void = DecoratorComponent.prototype.componentWillUnmount;
            let navigator: any = this;

            function setTabNavigationInjector() {
                if (!navigator.tabNavigation) {
                    navigator.tabNavigation = this.props.navigation;
                }
                willMount && willMount.bind(this)();
            };

            function clear() {
                navigator.tabNavigation = undefined;
                willUnmount && willUnmount.bind(this)();
            };

            DecoratorComponent.prototype.componentWillMount = setTabNavigationInjector;
            DecoratorComponent.prototype.componentWillUnmount = clear;

        };
    }

    constructor(configs: RouterConfigs) {
        this.appNavigator = StackNavigator(configs.routeConfigMap, configs.stackConfig);
    }

    public get navigator(): NavigationContainer {
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
