import { NavigationActions } from "react-navigation";
import * as Lodash from "lodash";
import { fromJS, Iterable } from "immutable";
import { State, initialState } from "./../store/index";
import { ACTIONTYPES_USER_UPDATE } from "./../constants";

function fromJSFilterNotNull(jsValue: any): any {
    let value: any = fromJS(jsValue);
    return Iterable.isIterable(value) ?
        value.map((x: any) => x === null ? "" : x) : (value === null ? "" : value);
}

export default function userReducers(state: State = initialState, action: StoreAction): State {
    let nextState: State;
    switch (action.type) {
        case ACTIONTYPES_USER_UPDATE: {
            const resetState: boolean = !action.meta || !action.meta.storeKey;
            nextState = resetState ? fromJSFilterNotNull(action.payload) : state.setIn(action.meta.storeKey.split("."), fromJSFilterNotNull(action.payload));
            break;
        }
    }
    return nextState || state;
}
