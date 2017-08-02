import { Dimensions, PixelRatio, Platform } from "react-native";

let {height, width} = Dimensions.get("window");

/** 当前设备系统是ios */
export const ios = (Platform.OS === "ios");

/** 当前设备屏幕高度 */
export const SCREEN_HEIGHT = PixelRatio.get();

/** 当前设备屏幕宽度 */
export const SCREEN_WIDTH = PixelRatio.get();

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

/** ROUTES - MainScreen - tabs screens */
/** ROUTES - tab - 主页 */
export const ROUTES_HOME: string = "Home";
/** ROUTES - tab - 逛市场 */
export const ROUTES_MARKET: string = "Market";
/** ROUTES - tab - 搜款式 */
export const ROUTES_SEARCH: string = "Search";
/** ROUTES - tab - 采购单 */
export const ROUTES_ORDER: string = "Order";
/** ROUTES - tab - 我的 */
export const ROUTES_USER: string = "User";

/** ROUTES - Stacks screens */
/** ROUTES - Stacks - 主页 */
export const ROUTES_MAIN: string = "Main";
/** ROUTES - Stacks - 登录页 */

export const ROUTES_LOGIN: string = "Login";
/** ROUTES - Stacks - 店铺详情页 */
export const ROUTES_SHOP: string = "Shop";
/** ROUTES - Stacks - 宝贝详情页 */
export const ROUTES_GOODS: string = "Goods";
/** ROUTES - Stacks - 宝贝列表页 */
export const ROUTES_GOODS_LIST: string = "GoodsList";
/** ROUTES - Stacks - 消息列表页 */
export const ROUTES_NOTIFICATION_LIST: string = "Notification";
/** ROUTES - Stacks - 消息列表页 */
export const ROUTES_CHAT: string = "Notification";


/** ROUTES - Stacks - 用户设置 */
export const ROUTES_SETTING: string = "Setting";
/** ROUTES - Stacks - 用户注册 */
export const ROUTES_REGISTER: string = "Register";
/** ROUTES - Stacks - 用户找回密码 */
export const ROUTES_RESET_PASSWORD: string = "ResetPassword";
/** ROUTES - Stacks - 用户短信验证 */
export const ROUTES_IDENTIFICATION: string = "Identification";
/** ROUTES - Stacks - 用户个人资料设置 */
export const ROUTES_PROFILE: string = "Profile";
/** ROUTES - Stacks - 用户个人资料修改编辑页 */
export const ROUTES_PROFILE_EDIT: string = "ProfileEdit";


/** -------  REQUEST ERROR STATUS DEFINITION   ------- */

/** Request 请求失败 - 用户未登录 */
export const REQUEST_ERROR_UNAUTH: number = 1;
/** Request 请求失败 - 网络错误 */
export const REQUEST_ERROR_NETERROR: number = 2;
/** Request 请求失败 - 设备处于离线状态 */
export const REQUEST_ERROR_NETINFO_NONE: number = 3;
/** Request 请求失败 - 未知错误 */
export const REQUEST_ERROR_UNKNOW: number = 10000;



