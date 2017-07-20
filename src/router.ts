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
    transitionConfig: () => ({
        screenInterpolator(sceneProps: any) {
            const { position, scene } = sceneProps;
            const { index } = scene;

            const opacity = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [0, 1, 0]
            });
            return { opacity };
        }
    }),
};