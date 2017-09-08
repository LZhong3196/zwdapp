import * as React from "react";
import {
    View,
    Text,
    ViewProperties
} from "react-native";
import { Item } from "native-base";
import { Row, Grid, Col } from "react-native-easy-grid";
import { Widgets, Constants, Store, APIs, Navigator, Routes } from "summer";
import { UMSocial, UMUserInfo, NativeModulesResponse } from "summer-native-modules";
import { styles } from "./style";

let { Icon, Divider, Toast } = Widgets;
let {
    SOCIAL_PLATFORM_TYPE_WECHAT,
    SOCIAL_PLATFORM_TYPE_QQ,
    SOCIAL_PLATFORM_TYPE_ALIPAY,
    REQUEST_ERROR_UNREGISTERED
} = Constants;

const PlatformDescr: Dictionary<string> = {
    SOCIAL_PLATFORM_TYPE_WECHAT: "微信",
    SOCIAL_PLATFORM_TYPE_ALIPAY: "旺旺",
    SOCIAL_PLATFORM_TYPE_QQ: "QQ",
};

export interface SocialLoginProps extends ViewProperties {
    handleAuthTodo: (resolve: boolean) => void;
    updateProfile: () => void;
}

export default class SocialLogin extends React.Component<SocialLoginProps, any> {

    componentWillUnmount() {
        UMSocial.clearWatch();
    }

    render() {
        return (
            <View style={styles.container}>
                <Divider title="快速登录" width={200}/>
                <Item style={styles.optionContainer}>
                    <Col style={styles.optionItem}>
                        <Icon
                            type="&#xe639;"
                            color="#00C806"
                            size={32} style={styles.itemIcon}
                            onPress={() => this.onLogin(SOCIAL_PLATFORM_TYPE_WECHAT)}/>
                        <Text style={styles.optionText}>微信登录</Text>
                    </Col>
                    <Col style={styles.optionItem}>
                        <Icon
                            type="&#xe60c;"
                            color="#4BBAEA"
                            size={32} style={styles.itemIcon}
                            onPress={() => this.onLogin(SOCIAL_PLATFORM_TYPE_QQ)}/>
                        <Text style={styles.optionText}>QQ登录</Text>
                    </Col>
                    <Col style={styles.optionItem}>
                        <Icon
                            type="&#xe696;"
                            size={32}
                            style={styles.itemIcon}
                            onPress={() => this.onLogin(SOCIAL_PLATFORM_TYPE_ALIPAY)}/>
                        <Text style={styles.optionText}>旺旺登录</Text>
                    </Col>
                </Item>
            </View>
        );
    }

    onLogin = async (platform: string) => {
        try {
            Toast.loading({
                duration: -1
            });
            let res: NativeModulesResponse<UMUserInfo> = await UMSocial.login(platform as any);
            let UMUserInfo: UMUserInfo = res.data;
            let authRes: any = await APIs.account.getAuthFromSocialPlatform({
                platform: platform,
                uid: UMUserInfo.uid,
                accessToken: UMUserInfo.accessToken,
                refreshToken: UMUserInfo.refreshToken || "",
            });

            Toast.success({
                text: UMUserInfo.name || "已登录"
            });
            Navigator.back();
            Store.update("user.account", {
                account: UMUserInfo.name,
                isLoggedIn: true,
                token: authRes.data.token,
                password: UMUserInfo.uid
            });

            this.props.handleAuthTodo(authRes.data.token);
            this.props.updateProfile();
        }
        catch (e) {
            if (e.code === REQUEST_ERROR_UNREGISTERED) {
                Navigator.to(Routes.ROUTES_REGISTER);
            }
            else {
                let info: string = `${PlatformDescr[platform]}登录失败, 请重试`;
                Toast.error({
                    text: info
                });
            }
        }
    }
}
