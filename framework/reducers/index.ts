import * as ReduxImmutbale from "redux-immutable";

import navigationReducers from "./navigation";
import userReducers from "./user";
import dataReducers from "./data";
import homeReducers from "./home";
import marketReducers from "./market";
import orderReducers from "./order";
import notificationReducers from "./notification";
import searchReducers from "./search";
import goodsReducers from "./goods";

const appReducers: Redux.Reducer<any> = ReduxImmutbale.combineReducers({
    nav: navigationReducers,
    user: userReducers,
    data: dataReducers,
    home: homeReducers,
    market: marketReducers,
    order: orderReducers,
    notification: notificationReducers,
    search: searchReducers,
    goods: goodsReducers
});

export default appReducers;