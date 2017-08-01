import { Constants } from "summer";
import LoginScreen from "./screens/stacks/login";
import ShopPageScreen from "./screens/stacks/shop-page";
import GoodsPageScreen from "./screens/stacks/goods-page";
import SettingScreen from "./screens/stacks/setting";
import MainScreen from "./screens/tabs";
import NotificationListScreen from "./screens/stacks/notification"

let {
    ROUTES_LOGIN,
    ROUTES_MAIN,
    ROUTES_GOODS,
    ROUTES_SHOP,
    ROUTES_SETTING,
    ROUTES_NOTIFICATION_LIST
} = Constants;


export const routeConfigMap = {
    [ROUTES_LOGIN]: { screen: LoginScreen },
    [ROUTES_MAIN]: { screen: MainScreen },
    [ROUTES_SHOP]: { screen: ShopPageScreen },
    [ROUTES_GOODS]: { screen: GoodsPageScreen },
    [ROUTES_SETTING]: { screen: SettingScreen },
    [ROUTES_NOTIFICATION_LIST]: { screen: NotificationListScreen }
};

export const stackConfig: any = {
    // transitionConfig: () => ({
    //     screenInterpolator(sceneProps: any) {
    //         const { position, scene } = sceneProps;
    //         const { index } = scene;

    //         const opacity = position.interpolate({
    //             inputRange: [index - 1, index, index + 1],
    //             outputRange: [0, 1, 0]
    //         });
    //         return { opacity };
    //     }
    // }),
};