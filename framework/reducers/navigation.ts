import * as Immutable from "immutable";
import * as ReactNavigation from "react-navigation";
import { NavigationActions } from "react-navigation";
import { State, initialState } from "./../store/index";
import {
    ACTIONTYPES_LOGGED_IN,
    ACTIONTYPES_LOGGED_OUT,
    ACTIONTYPES_NAVIGATION_TO,
    ACTIONTYPES_NAVIGATION_BACK,
    ACTIONTYPES_NAVIGATION_RESET,
    ROUTES_LOGIN,
    ROUTES_MAIN
} from "./../constants";
import Navigator from "./../navigator/index";


function navigationReducers(state: State = initialState, action: StoreAction): State {
    let nextState: State;
    let navigator: ReactNavigation.NavigationContainer = Navigator.navigatorInstance;

    switch (action.type) {
        case ACTIONTYPES_LOGGED_IN: {
            nextState = state.merge(navigator.router.getStateForAction(
                NavigationActions.back(),
                state.toJS()
            ));
            break;
        }
        case ACTIONTYPES_LOGGED_OUT: {
            nextState = state.merge(navigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: ROUTES_LOGIN,
                    params: action.meta.params
                }),
                state.toJS()
            ));
            break;
        }
        case ACTIONTYPES_NAVIGATION_TO: {
            const { routeName, params } = action.meta;
            const routes: Array<any> = state.toJS()!.routes;
            const debounce: boolean = routeName === routes[routes.length - 1].routeName;
            if (debounce) {
                return state;
            }
            else {
                nextState = state.merge(navigator.router.getStateForAction(
                    NavigationActions.navigate({
                        routeName: routeName,
                        params: params
                    }),
                    state.toJS()
                ));
                break;
            }
        }
        case ACTIONTYPES_NAVIGATION_BACK: {
            nextState = state.merge(navigator.router.getStateForAction(
                NavigationActions.back(),
                state.toJS()
            ));
            break;
        }
        case ACTIONTYPES_NAVIGATION_RESET: {
            const resetRouteName: string = action.meta.resetRouteName || ROUTES_MAIN;
            const routes: Array<string> = state.toJS().routes.map((routes: any) => routes.routeName);
            let resetIndex: number = 0;
            let newActions: Array<any> = [
                NavigationActions.navigate({
                    routeName: ROUTES_MAIN,
                    params: action.meta.params
                })
            ];
            if (resetRouteName !== ROUTES_MAIN) {
                resetIndex = routes.indexOf(resetRouteName);
                const resetRoutes: Array<string> = routes.slice(0, resetIndex + 1);
                newActions = resetRoutes.map((routeName: string) => NavigationActions.navigate({
                    routeName: routeName,
                    params: action.meta.params
                }));
            }
            nextState = state.merge(navigator.router.getStateForAction(
                NavigationActions.reset({
                    index: resetIndex,
                    actions: newActions
                }),
                state.toJS()
            ));
            break;
        }
    }
    return nextState || state;
}

export default navigationReducers;