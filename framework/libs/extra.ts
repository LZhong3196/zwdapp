import {
    Alert,
    Platform,
    NetInfo
} from "react-native";
import {
    REQUEST_ERROR_UNAUTH,
    REQUEST_ERROR_NETERROR,
    REQUEST_ERROR_NETINFO_NONE,
    ACTIONTYPES_NAVIGATION_TO,
    ROUTES_LOGIN
} from "./../constants";
import Store from "./../store/index";

let appStore: Store;

export function setStore(instance: Store) {
    if (!appStore) {
        appStore = instance;
    }
    return appStore;
}

export function isNetworkConnected() {
    if (Platform.OS === "ios") {
        return new Promise((resolve: any) => {
            const handleFirstConnectivityChangeIOS = (isConnected: boolean) => {
                NetInfo.isConnected.removeEventListener("change", handleFirstConnectivityChangeIOS);
                resolve(isConnected);
            };
            NetInfo.isConnected.addEventListener("change", handleFirstConnectivityChangeIOS);
        });
    }
    return NetInfo.isConnected.fetch();
}

/** Request error handler */
export function resolveError(error: any): boolean {
    if (!error.code) {
        return false;
    }
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
                [
                    {
                        text: "知道了"
                    }
                ]
            )
            break;
        }
        default: return false;
    }

    return true;
};


export function getToken(): string {
    if (!appStore) {
        return "";
    }
    return appStore.get("user.account.token") || "";
}