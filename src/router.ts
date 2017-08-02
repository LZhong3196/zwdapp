import { Constants } from "summer";

/** 用户相关模块 */
import LoginScreen from "./screens/stacks/user/login";
import SettingScreen from "./screens/stacks/user/setting";
import PasswordSettingScreen from "./screens/stacks/user/password-setting";
import IdentificationScreen from "./screens/stacks/user/identification";

/**  */
import ShopPageScreen from "./screens/stacks/shop-page";
import GoodsPageScreen from "./screens/stacks/goods-page";
import MainScreen from "./screens/tabs";
import NotificationListScreen from "./screens/stacks/notification";
import QRscanner from "./screens/stacks/QRScanner/index";

let {
    ROUTES_LOGIN,
    ROUTES_REGISTER,
    ROUTES_RESET_PASSWORD,
    ROUTES_IDENTIFICATION,
    ROUTES_MAIN,
    ROUTES_GOODS,
    ROUTES_SHOP,
    ROUTES_SETTING,
    ROUTES_NOTIFICATION_LIST,
    ROUTES_QRSCANNER
} = Constants;


export const routeConfigMap = {
    [ROUTES_LOGIN]: { screen: LoginScreen },
    [ROUTES_SETTING]: { screen: SettingScreen },
    [ROUTES_REGISTER]: { screen: PasswordSettingScreen },
    [ROUTES_IDENTIFICATION]: { screen: IdentificationScreen },
    [ROUTES_RESET_PASSWORD]: { screen: PasswordSettingScreen },
    [ROUTES_MAIN]: { screen: MainScreen },
    [ROUTES_SHOP]: { screen: ShopPageScreen },
    [ROUTES_GOODS]: { screen: GoodsPageScreen },
    [ROUTES_SETTING]: { screen: SettingScreen },
    [ROUTES_NOTIFICATION_LIST]: { screen: NotificationListScreen },
    [ROUTES_QRSCANNER]: { screen: QRscanner }
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