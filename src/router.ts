import { Constants } from "summer";
import LoginScreen from "./screens/stacks/login";
import ShopPageScreen from "./screens/stacks/shop-page";
import GoodsPageScreen from "./screens/stacks/goods-page";
import SettingScreen from "./screens/stacks/setting";
import MainScreen from "./screens/tabs";

let {
    ROUTES_LOGIN,
    ROUTES_MAIN,
    ROUTES_GOODS,
    ROUTES_SHOP,
    ROUTES_SETTING
} = Constants;


export const routeConfigMap = {
    [ROUTES_LOGIN]: { screen: LoginScreen },
    [ROUTES_MAIN]: { screen: MainScreen },
    [ROUTES_SHOP]: { screen: ShopPageScreen },
    [ROUTES_GOODS]: { screen: GoodsPageScreen },
    [ROUTES_SETTING]: { screen: SettingScreen }
};

export const stackConfig: any = {

};