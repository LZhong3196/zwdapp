import { Dimensions, PixelRatio, Platform } from "react-native";

let {height, width} = Dimensions.get("window");

// 系统是ios
global.ios = (Platform.OS === "ios");
// 系统是安卓
global.Android = (Platform.OS === "android");
// 获取屏幕宽度
global.SCREEN_WIDTH = width;
// 获取屏幕高度
global.SCREEN_HEIGHT = height;
// 获取屏幕分辨率
global.PixelRatio = PixelRatio.get();
// 最小线宽
global.pixel = 1 / PixelRatio;