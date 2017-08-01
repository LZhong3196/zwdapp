import * as ReduxImmutbale from "redux-immutable";

import navigationReducers from "./navigation";
import userReducers from "./user";
import dataReducers from "./data";

const appReducers: Redux.Reducer<any> = ReduxImmutbale.combineReducers({
    nav: navigationReducers,
    user: userReducers,
    ...dataReducers
});

export default appReducers;