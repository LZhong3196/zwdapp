import { Constants } from "summer";

/** 用户相关模块 */
import LoginScreen from "./screens/stacks/user/login";
import RegisterScreen from "./screens/stacks/user/register";
import SettingScreen from "./screens/stacks/user/setting";
import RetrievePasswordScreen from "./screens/stacks/user/retrieve-password";
import IdentificationScreen from "./screens/stacks/user/identification";

/**  */
import ShopPageScreen from "./screens/stacks/shop-page";
import GoodsPageScreen from "./screens/stacks/goods-page";
import MainScreen from "./screens/tabs";

let {
    ROUTES_LOGIN,
    ROUTES_REGISTER,
    ROUTES_SETTING,
    ROUTES_RETRIEVE_PASSWORD,
    ROUTES_IDENTIFICATION,
    ROUTES_MAIN,
    ROUTES_GOODS,
    ROUTES_SHOP,
} = Constants;


export const routeConfigMap = {
    [ROUTES_LOGIN]: { screen: LoginScreen },
    [ROUTES_SETTING]: { screen: SettingScreen },
    [ROUTES_REGISTER]: { screen: RegisterScreen },
    [ROUTES_IDENTIFICATION]: { screen: IdentificationScreen },
    [ROUTES_RETRIEVE_PASSWORD]: { screen: RetrievePasswordScreen },
    [ROUTES_MAIN]: { screen: MainScreen },
    [ROUTES_SHOP]: { screen: ShopPageScreen },
    [ROUTES_GOODS]: { screen: GoodsPageScreen },
};

export const stackConfig: any = {

};