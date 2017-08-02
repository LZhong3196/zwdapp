import { Constants } from "summer";

/** 用户相关模块 */
import LoginScreen from "./screens/stacks/user/login";
import SettingScreen from "./screens/stacks/user/setting";
import ProfileScreen from "./screens/stacks/user/profile";
import ProfileEditScreen from "./screens/stacks/user/profile/edit";
import IdentificationScreen from "./screens/stacks/user/identification";
import PasswordSettingScreen from "./screens/stacks/user/password-setting";

/**  */
import ShopPageScreen from "./screens/stacks/shop-page";
import GoodsPageScreen from "./screens/stacks/goods-page";
import MainScreen from "./screens/tabs";

let {
    ROUTES_LOGIN,
    ROUTES_REGISTER,
    ROUTES_SETTING,
    ROUTES_PROFILE,
    ROUTES_PROFILE_EDIT,
    ROUTES_RESET_PASSWORD,
    ROUTES_IDENTIFICATION,
    ROUTES_MAIN,
    ROUTES_GOODS,
    ROUTES_SHOP,
} = Constants;


export const routeConfigMap = {
    [ROUTES_LOGIN]: { screen: LoginScreen },
    [ROUTES_SETTING]: { screen: SettingScreen },
    [ROUTES_PROFILE]: { screen: ProfileScreen },
    [ROUTES_REGISTER]: { screen: PasswordSettingScreen },
    [ROUTES_PROFILE_EDIT]: { screen: ProfileEditScreen },
    [ROUTES_IDENTIFICATION]: { screen: IdentificationScreen },
    [ROUTES_RESET_PASSWORD]: { screen: PasswordSettingScreen },
    [ROUTES_MAIN]: { screen: MainScreen },
    [ROUTES_SHOP]: { screen: ShopPageScreen },
    [ROUTES_GOODS]: { screen: GoodsPageScreen },
};

export const stackConfig: any = {

};