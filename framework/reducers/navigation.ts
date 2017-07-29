import * as Immutable from "immutable";
import * as ReactNavigation from "react-navigation";
import { NavigationActions } from "react-navigation";
import { State, initialState } from "./../store/index";
import {
    ACTIONTYPES_LOGGED_IN,
    ACTIONTYPES_LOGGED_OUT,
    ACTIONTYPES_NAVIGATION_TO,
    ACTIONTYPES_NAVIGATION_BACK,
    ROUTES_LOGIN
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
                    key: ROUTES_LOGIN,
                    params: action.meta.params
                } as any),
                state.toJS()
            ));
            break;
        }
        case ACTIONTYPES_NAVIGATION_TO: {
            nextState = state.merge(navigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: action.meta.routeName,
                    key: action.meta.routeName,
                    params: action.meta.params
                } as any),
                state.toJS()
            ));
            break;
        }
        case ACTIONTYPES_NAVIGATION_BACK: {
            nextState = state.merge(navigator.router.getStateForAction(
                NavigationActions.back(),
                state.toJS()
            ));
            break;

        }
    }
    return nextState || state;
}

export default navigationReducers;