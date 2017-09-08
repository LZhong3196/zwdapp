import {
    NativeModules,
    Alert,
    NativeEventEmitter,
    Platform
} from "react-native";
import {
    NativeModulesResponse,
    UMAppConfigs,
    UMUserInfo,
    UMShareOptions
} from "summer-native-modules";
const UMNative = NativeModules.UmengNativeModule;

let {
    PLATFORM_TYPE_WECHAT,
    PLATFORM_TYPE_WECHATTL,
    PLATFORM_TYPE_QQ,
    PLATFORM_TYPE_SINA,
    PLATFORM_TYPE_ALIPAY,
    PLATFORM_TYPE_TENCENTWEIBO,
    PLATFORM_TYPE_QQZONE
} = UMNative;

const UMNativeEmitter = new NativeEventEmitter(UMNative);

export const PlatformMap: Dictionary<number> = {
    WeChat: PLATFORM_TYPE_WECHAT,
    WeChatTL: PLATFORM_TYPE_WECHATTL,
    QQ: PLATFORM_TYPE_QQ,
    Sina: PLATFORM_TYPE_SINA,
    Alipay: PLATFORM_TYPE_ALIPAY,
    TencentWeibo: PLATFORM_TYPE_TENCENTWEIBO,
    QQZone: PLATFORM_TYPE_QQZONE
};

let subscriptions: any;

export function init(configs: UMAppConfigs) {
    if (UMNative && UMNative.setConfiguration) {
        let configuration = Platform.OS === "ios" ? configs.iOS : configs.Android;
        UMNative.setConfiguration(configuration);
    }
}

export function share(options: UMShareOptions, callback?: Function): NativeModulesResponse<boolean> {
    // onWatch("Share_Resp", callback);
    return UMNative.share({
        ...options,
        platform: PlatformMap[options.platform]
    });
}

export function login(platform: "WeChat" | "QQ" | "Sina" | "Alipay", callback?: Function): NativeModulesResponse<UMUserInfo> {
    // onWatch("Login_Resp", callback);
    return UMNative.login(PlatformMap[platform]);
};


function onWatch(eventName: "Login_Resp" | "Share_Resp" , callback?: Function) {
    UMNative.startObserving && UMNative.startObserving();
    subscriptions = UMNativeEmitter.addListener(eventName, (resp: NativeModulesResponse<any>) => {
        callback && callback(resp);
    });
}

export function clearWatch() {
    if (subscriptions) {
        subscriptions = undefined;
        UMNative.stopObserving && UMNative.stopObserving();
    }
}
