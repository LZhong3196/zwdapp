import * as Immutable from "immutable";

import { State, initialState } from "./../store/index";
import { ACTIONTYPES_HOME_UPDATE } from "./../constants";

function homeReducers(state: State = initialState, action: StoreAction): State {
    let nextState: State;
    switch (action.type) {
        case ACTIONTYPES_HOME_UPDATE: {
            nextState = state.setIn( action.meta.storeKey.split("."), Immutable.fromJS(action.payload) );
            break;
        }
    }
    return nextState || state;
}

export default homeReducers;