import * as ReduxImmutbale from "redux-immutable";

import navigationReducers from "./navigation";
import userReducers from "./user";
import dataReducers from "./data";
import marketReducers from "./market";
import orderReducers from "./order";
import notificationReducers from "./notification";
import searchReducers from "./search";

const appReducers: Redux.Reducer<any> = ReduxImmutbale.combineReducers({
    nav: navigationReducers,
    user: userReducers,
    data: dataReducers,
    market: marketReducers,
    order: orderReducers,
    notification: notificationReducers,
    search: searchReducers
});

export default appReducers;