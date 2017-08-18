import { Dimensions, PixelRatio, Platform } from "react-native";

let { height, width } = Dimensions.get("window");

/** 当前设备系统是否是ios */
export const ios = (Platform.OS === "ios");

/** 当前设备屏幕高度 */
export const SCREEN_HEIGHT = height;

/** 当前设备屏幕宽度 */
export const SCREEN_WIDTH = width;

/** 当前设备像素密度 */
export const DEVICE_DENSITY = PixelRatio.get();


/** Persist store whitelist - 持久化数据白名单 | 与state对应 */
export const PERSIST_STORE_WHITE_LIST: Array<string> = [
    "user"
];

/** -------  ACTION TYPES DEFINITION   ------- */

/** Action type - Navigation */
export const ACTIONTYPES_LOGGED_IN: string = "Navigation/LOGGED_IN";
export const ACTIONTYPES_LOGGED_OUT: string = "Navigation/LOGGED_OUT";
export const ACTIONTYPES_NAVIGATION_TO: string = "Navigation/NAVIGATE";
export const ACTIONTYPES_NAVIGATION_BACK: string = "Navigation/BACK";
export const ACTIONTYPES_NAVIGATION_RESET: string = "Navigation/RESET";
export const ACTIONTYPES_NAVIGATION_SET_PARAMS: string = "Navigation/SET_PARAMS";

/** Action type - User */
export const ACTIONTYPES_USER_UPDATE: string = "User/UPDATE";

/** Action type - DATA */
export const ACTIONTYPES_DATA_UPDATE: string = "Data/UPDATE";
/** Action type - HOME */
export const ACTIONTYPES_HOME_UPDATE: string = "Home/UPDATE";
/** Action type - MARKET */
export const ACTIONTYPES_MARKET_UPDATE: string = "Market/UPDATE";
/** Action type - ORDER */
export const ACTIONTYPES_ORDER_UPDATE: string = "Order/UPDATE";
/** Action type - SEARCH */
export const ACTIONTYPES_GOODS_UPDATE: string = "Goods/UPDATE";
/** Action type - SEARCH */
export const ACTIONTYPES_SEARCH_UPDATE: string = "Search/UPDATE";
/** Action type - NOTIFICATION */
export const ACTIONTYPES_NOTIFICATION_UPDATE: string = "Notification/UPDATE";


/** -------  NAVIGATION ROUTES DEFINITION   ------- */
/** ROUTES - Stacks - 主页 */
export const ROUTES_MAIN: string = "ROUTES_MAIN";
/** ROUTES - Stacks - 登录页 */
export const ROUTES_LOGIN: string = "ROUTES_LOGIN";

/** ROUTES - Stacks - 订单详情 */
export const ROUTES_ORDER_DETAIL: string = "OrderDetail"

/** -------  REQUEST ERROR STATUS DEFINITION   ------- */

/** Request 请求失败 - 用户未登录 */
export const REQUEST_ERROR_UNAUTH: number = 1;
/** Request 请求失败 - 网络错误 */
export const REQUEST_ERROR_NETERROR: number = 2;
/** Request 请求失败 - 设备处于离线状态 */
export const REQUEST_ERROR_NETINFO_NONE: number = 3;
/** Request 请求失败 - 未知错误 */
export const REQUEST_ERROR_UNKNOW: number = 10000;



