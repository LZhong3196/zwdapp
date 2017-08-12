import {
    REQUEST_ERROR_UNAUTH,
    REQUEST_ERROR_NETERROR,
    REQUEST_ERROR_NETINFO_NONE,
    ACTIONTYPES_NAVIGATION_TO,
    ACTIONTYPES_DATA_UPDATE,
    ROUTES_LOGIN
} from "./../constants";
import Store from "./../store/index";
import Navigator from "./../navigator/index";
import { Toast } from "./../components/index";


/** Request error handler */
export async function resolveError(error: any): Promise<any> {
    switch (error.code) {
        case REQUEST_ERROR_UNAUTH: {
            Navigator.to(ROUTES_LOGIN);
            return new Promise((resolve: Function) => {
                Store.update("data.resolveTodo", resolve);
            });
        }
        case REQUEST_ERROR_NETINFO_NONE: {
            Toast.info({
                text: "当前未连接网络"
            });
            break;
        }
        default: {
            if (!!error.code && !!error.msg) {
                Toast.info({
                    text: error.msg
                });
            }
            break;
        }
    }
    return new Promise((resolve: Function) => {
        resolve(false);
    });
};


export function getToken(): string {
    return Store.get("user.account.token") || "";
}
