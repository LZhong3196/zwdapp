import { NavigationActions } from "react-navigation";
import * as Lodash from "lodash";
import * as Immutable from "immutable";
import { State, initialState } from "./../store/index";
import { ACTIONTYPES_USER_UPDATE } from "./../constants";

export default function userReducers(state: State = initialState, action: StoreAction): State {
    let nextState: State;
    switch (action.type) {
        case ACTIONTYPES_USER_UPDATE: {
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
