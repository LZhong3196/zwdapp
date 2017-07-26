import {
    Platform,
    NetInfo
} from "react-native";
import Store from "./../store/index";

const IS_DEV = (global as any).__DEV__;
const IS_DEBUG = (global as any).__DEBUG__;

export function isNetworkConnected() {
    if (Platform.OS === "ios") {
        return new Promise((resolve: any) => {
            const handleFirstConnectivityChangeIOS = (isConnected: any) => {
                NetInfo.isConnected.removeEventListener("change", handleFirstConnectivityChangeIOS);
                resolve(isConnected);
            };
            NetInfo.isConnected.addEventListener("change", handleFirstConnectivityChangeIOS);
        });
    }
    return NetInfo.isConnected.fetch();
}

const handleConnectivityChange = (reach: any) => {
    (global as any).__NETINFO__ = !!reach && typeof (reach) === "string" ? reach.toLocaleUpperCase() : reach;
    if (IS_DEV || IS_DEBUG) {
        console.log(`%c NetInfo | 当前网络连接状态 : ${reach}`, `color: #55D658`);
    }
};

export function addConnectivityListener() {
    NetInfo.addEventListener("change", handleConnectivityChange);
}

export function removeConnectivityListener() {
    NetInfo.removeEventListener("change", handleConnectivityChange);
}


export function initConnectivityInfo() {
    let appStore: Store = Store.instance;
    let connectLimit: boolean = !!appStore.get("user.setting.connect_limit");

    (global as any).__CONNECT_LIMIT__ = connectLimit;
    NetInfo.fetch().then((reach: any) => {
        (global as any).__NETINFO__ = reach;
    });

    if (connectLimit) {
        addConnectivityListener();
    }
}