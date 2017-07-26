import {
    Alert
} from "react-native";
import {
    REQUEST_ERROR_UNAUTH,
    REQUEST_ERROR_NETERROR,
    REQUEST_ERROR_NETINFO_NONE,
    ACTIONTYPES_NAVIGATION_TO,
    ROUTES_LOGIN
} from "./../constants";
import Store from "./../store/index";


/** Request error handler */
export function resolveError(error: any): boolean {
    if (!error.code) {
        return false;
    }
    let appStore: Store = Store.instance;
    switch (error.code) {
        case REQUEST_ERROR_UNAUTH: {
            appStore.dispatch({
                type: ACTIONTYPES_NAVIGATION_TO,
                meta: {
                    routeName: ROUTES_LOGIN,
                    key: ROUTES_LOGIN,
                }
            });
            break;
        }
        case REQUEST_ERROR_NETINFO_NONE: {
            Alert.alert(
                "提示",
                "当前未连接网络",
                [ { text: "知道了" } ]
            )
            break;
        }
        default: return false;
    }

    return true;
};


export function getToken(): string {
    let appStore: Store = Store.instance;
    if (!appStore) {
        return "";
    }
    return appStore.get("user.account.token") || "";
}