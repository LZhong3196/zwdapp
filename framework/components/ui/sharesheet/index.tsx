
import * as React from "react";
import {
    ViewProperties,
    Platform,
    Clipboard,
    Alert
} from "react-native";
import {
    Text,
    Button
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Share, { ShareSheet as RNShareSheet } from "react-native-share";
import {
    UMSocial,
    UMShareOptions,
} from "summer-native-modules";
import {
    SOCIAL_PLATFORM_TYPE_ALIPAY,
    SOCIAL_PLATFORM_TYPE_QQZONE,
    SOCIAL_PLATFORM_TYPE_QQ,
    SOCIAL_PLATFORM_TYPE_SINA,
    SOCIAL_PLATFORM_TYPE_TENCENTWEIBO,
    SOCIAL_PLATFORM_TYPE_WECHAT,
    SOCIAL_PLATFORM_TYPE_WECHATTL
} from "./../../../constants";

import { styles } from "./style";
import { Toast, Icon, Divider } from "./../../index";

interface ItemProps extends ViewProperties {
    title: string;
    iconType: string;
    iconColor: string;
    onPress?: () => void;
}

class Item extends React.Component<ItemProps, any> {
    static defaultProps = {
        onPress: () => { }
    };

    shouldComponentUpdate(nextProps: any, nextState: any) {
        return false;
    }

    render() {
        const {
            title,
            iconType,
            iconColor,
            onPress
        } = this.props;
        return (
            <Button
                onPress={(e?: any) => onPress()}
                transparent
                style={styles.item}>
                <Icon
                    type={iconType}
                    size={32}
                    style={{ width: 40 }}
                    color={iconColor} />
                <Text style={styles.itemText}>{title}</Text>
            </Button>
        );
    }
}

export interface ShareSheetProps extends ViewProperties {
    visible: boolean;
    onCancel: (e?: any) => void;
    qrcode?: string | {
        dataType: string;
        value: any;
    };
    options?: UMShareOptions;
}

export default class ShareSheet extends React.Component<ShareSheetProps, any> {
    static defaultProps: ShareSheetProps = {
        visible: false,
        onCancel: () => { }
    };

    constructor(props: ShareSheetProps, context: any) {
        super(props, context);
    }

    componentWillUnmount() {
        UMSocial.clearWatch();
    }

    render() {
        const {
            qrcode,
            visible,
            onCancel
        } = this.props;
        return (
            <RNShareSheet
                style={{ paddingHorizontal: 12 }}
                visible={visible}
                onCancel={(e?: any) => onCancel(e)} >
                <Row style={{ ...styles.container, ...styles.justifyStart }}>
                    {qrcode && <Item iconType="&#xe7f8;" iconColor="#FF0000" title="二维码" />}
                    <Item
                        iconType="&#xe6a2;" iconColor="#00C806" title="复制链接" onPress={this.onCopy} />
                </Row>
                <Divider title="其他分享" />
                <Row style={styles.container}>
                    <Item
                        onPress={() => this.onShare(SOCIAL_PLATFORM_TYPE_WECHAT)}
                        iconType="&#xe639;" iconColor="#00C806" title="微信好友" />
                    <Item
                        onPress={() => this.onShare(SOCIAL_PLATFORM_TYPE_WECHATTL)}
                        iconType="&#xe805;" iconColor="#FF6E51" title="朋友圈" />
                    <Item
                        iconType="&#xe6c2;" iconColor="#00C806" title="微信收藏" />
                    <Item
                        onPress={() => this.onShare(SOCIAL_PLATFORM_TYPE_QQZONE)}
                        iconType="&#xe60c;" iconColor="#FF5A37" title="QQ空间" />
                </Row>
                <Row style={styles.container}>
                    <Item
                        onPress={() => this.onShare(SOCIAL_PLATFORM_TYPE_TENCENTWEIBO)}
                        iconType="&#xe7c6;" iconColor="#FFA936" title="腾讯微博" />
                    <Item
                        onPress={() => this.onShare(SOCIAL_PLATFORM_TYPE_QQ)}
                        iconType="&#xe60c;" iconColor="#4BBAEA" title="QQ好友" />
                    <Item
                        onPress={() => this.onShare(SOCIAL_PLATFORM_TYPE_SINA)}
                        iconType="&#xe64b;" iconColor="#FF2A27" title="新浪微博" />
                    <Item
                        onPress={() => this.onShare("share")}
                        iconType="&#xe644;" iconColor="#00B7F9" title="邮箱" />
                </Row>
                <Row style={styles.buttonContainer}>
                    <Button
                        style={styles.button}
                        transparent onPress={(e?: any) => onCancel(e)}>
                        <Text style={styles.buttonText}>取消</Text>
                    </Button>
                </Row>
            </RNShareSheet>
        );
    }

    onCopy = () => {
        Clipboard.setString(this.props.options.webpageUrl);
        Toast.success({
            text: "复制成功"
        });
        this.props.onCancel();
    }


    onShare = async (platform: string) => {
        const options: UMShareOptions = this.props.options;
        try {
            Toast.loading();
            let res: any = await UMSocial.share({
                ...options,
                platform: platform as any
            });
            this.props.onCancel();
        }
        catch (e) {
            Toast.error({
                text: `分享失败, 请重试`
            });
        }
    }
}