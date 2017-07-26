import * as Immutable from "immutable";

import { State, initialState } from "./../store/index";
import {
    ACTIONTYPES_DATA_UPDATE,
    ACTIONTYPES_MARKET_UPDATE,
    ACTIONTYPES_USER_UPDATE,
    ACTIONTYPES_NOTIFICATION_UPDATE,
    ACTIONTYPES_ORDER_UPDATE,
    ACTIONTYPES_SEARCH_UPDATE,
    ACTIONTYPES_GOODS_UPDATE
} from "./../constants";

export type AppReducerHandler = (state: State, action: StoreAction) => State;
type ReducerConfigs = Dictionary<Array<string>>;

const reducerConfigs: ReducerConfigs = {
    market: [ ACTIONTYPES_MARKET_UPDATE ],
    data: [ ACTIONTYPES_DATA_UPDATE ],
    order: [ ACTIONTYPES_ORDER_UPDATE ],
    search: [ ACTIONTYPES_SEARCH_UPDATE ],
    goods: [ ACTIONTYPES_GOODS_UPDATE ],
    notification: [ ACTIONTYPES_NOTIFICATION_UPDATE ]
};

function createReducer(actionTypes: Array<string>): AppReducerHandler {
    return (state: State = initialState, action: StoreAction): State => {
        let nextState: State;
        if (actionTypes.indexOf(action.type) !== -1) {
            const resetState: boolean = !action.meta || !action.meta.storeKey;
            nextState = resetState ? Immutable.fromJS(action.payload) : state.setIn(action.meta.storeKey.split("."), Immutable.fromJS(action.payload));
        }
        return nextState || state;
    };
}

function combineDataReducers(reducerConfigs: ReducerConfigs) {
    let reducers: Dictionary<AppReducerHandler> = {};
    for (const key in reducerConfigs) {
        reducers[key] = createReducer(reducerConfigs[key]);
    }
    return reducers;
}

const dataReducers: Dictionary<AppReducerHandler> = combineDataReducers(reducerConfigs);

export default dataReducers;