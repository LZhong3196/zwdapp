import { Constants } from "summer";

/** 用户相关模块 */
import LoginScreen from "./screens/stacks/user/login";
import SettingScreen from "./screens/stacks/user/setting";
import ProfileScreen from "./screens/stacks/user/profile";
import ProfileEditScreen from "./screens/stacks/user/profile/edit";
import IdentificationScreen from "./screens/stacks/user/identification";
import PasswordSettingScreen from "./screens/stacks/user/password-setting";

/**  */
import ShopPageScreen from "./screens/stacks/shop";
import GoodsPageScreen from "./screens/stacks/goods";
import MainScreen from "./screens/tabs";
import NotificationScreen from "./screens/stacks/notification";
import ScannerScreen from "./screens/stacks/scanner";
import FieldSearchScreen from "./screens/stacks/field-search";

export const TabRouteMap: HashMap<string> = {
    ROUTES_TAB_HOME: "Home",
    ROUTES_TAB_MARKET: "Market",
    ROUTES_TAB_SEARCH: "Search",
    ROUTES_TAB_ORDER: "Order",
    ROUTES_TAB_USER: "User"
};

/** Adding route name follow the template - ROUTES_[NEW_ROUTE_NAME]  */
export const routeConfigMap: HashMap<any> = {
    ROUTES_MAIN: { screen: MainScreen },
    ROUTES_LOGIN: { screen: LoginScreen },
    ROUTES_SETTING: { screen: SettingScreen },
    ROUTES_PROFILE: { screen: ProfileScreen },
    ROUTES_REGISTER: { screen: PasswordSettingScreen },
    ROUTES_PROFILE_EDIT: { screen: ProfileEditScreen },
    ROUTES_IDENTIFICATION: { screen: IdentificationScreen },
    ROUTES_RESET_PASSWORD: { screen: PasswordSettingScreen },
    ROUTES_SHOP: { screen: ShopPageScreen },
    ROUTES_GOODS: { screen: GoodsPageScreen },
    ROUTES_NOTIFICATION: { screen: NotificationScreen },
    ROUTES_SCANNER: { screen: ScannerScreen },
    ROUTES_FIELD_SEARCH: { screen: FieldSearchScreen }
};

export const stackConfig: any = {

};