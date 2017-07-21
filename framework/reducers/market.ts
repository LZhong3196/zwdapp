import * as Immutable from "immutable";

import { State, initialState } from "./../store/index";
import { ACTIONTYPES_MARKET_UPDATE } from "./../constants";

function marketReducers(state: State = initialState, action: StoreAction): State {
    let nextState: State;
    switch (action.type) {
        case ACTIONTYPES_MARKET_UPDATE: {
            if (!action.meta || !action.meta.storeKey) {
                nextState = Immutable.fromJS(action.payload);
            }
            else {
                nextState = state.setIn(action.meta.storeKey.split("."), Immutable.fromJS(action.payload));
            }
            break;
        }

    }
    return nextState || state;
}

export default marketReducers;