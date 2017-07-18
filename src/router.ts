import LoginScreen from "./screens/stacks/login";
import ShopPageScreen from "./screens/stacks/shop-page";
import GoodsPageScreen from "./screens/stacks/goods-page";
import MainScreen from "./screens/tabs";

export const routeConfigMap = {
    Login: { screen: LoginScreen },
    Main: { screen: MainScreen },
    Shop: { screen: ShopPageScreen },
    Goods: { screen: GoodsPageScreen },
};

export const stackConfig: any = {

};