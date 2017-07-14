import * as Immutable from "immutable";

import { State, initialState } from "./../store/index";
import { ACTIONTYPES_DATA_UPDATE } from "./../constants";

function dataReducers(state: State = initialState, action: StoreAction): State {
    let nextState: State;
    switch (action.type) {
        case ACTIONTYPES_DATA_UPDATE: {
            nextState = state.setIn( action.meta.storeKey.split("."), Immutable.fromJS(action.payload) );
            break;
        }
    }
    return nextState || state;
}

export default dataReducers;