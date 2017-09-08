declare module "summer-native-modules" {
    export interface NativeModulesResponse<T> {
        code: number;
        data: T;
        msg?: string;
    }

    export interface UMAppConfigs {
        iOS: {
            appKey: string;
            appId: string;
            url?: string;
            WeChat: {
                appKey: string;
                appSecret: string;
            };
            QQ: {
                appKey: string;
                appSecret: string;
            };
            Sina: {
                appKey: string;
                appSecret: string;
                url: string;
            };
            Alipay: {
                appKey: string;
            }
        };
        Android: {
            appKey: string;
            appId: string;
            url?: string;
            WeChat: {
                appKey: string;
                appSecret: string;
            };
            QQ: {
                appKey: string;
                appSecret: string;
            };
            Sina: {
                appKey: string;
                appSecret: string;
                url: string;
            };
            Alipay: {
                appKey: string;
            }
        }
    }

    export interface UMUserInfo {
        /** 授权数据 */
        /** 用户唯一标识 */
        uid: string;
        /** 用户唯一标识 - 主要为微信和QQ使用 */
        openid: string;
        /**  */
        accessToken: string;
        refreshToken: string;
        expiration: string;

        /** 用户数据 */
        name: string;
        iconurl: string;
        gender: string;

        /** 第三方平台SDK原始数据 */
        originalResponse: any;
    }

    export interface UMShareOptions {
        /** 分享平台 */
        platform: "WeChat" | "WeChatTL" | "QQ" | "Sina" | "Alipay" | "TencentWeibo" | "QQZone";
        /** 分享类型内容 */
        type: "image" | "text" | "video" | "music" | "LinkCard";
        /** 网页链接 */
        webpageUrl?: string;
        /** 标题 */
        title?: string;
        /** 内容 */
        descr?: string;
        /** 图片url */
        thumbURL?: string;
    }
}
