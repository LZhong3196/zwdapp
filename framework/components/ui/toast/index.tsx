/** TODO - ?notification extend */
/** Extends from NativeBase/toast */
import * as React from "react";
import {
    View,
    Modal,
    Platform,
    Animated,
    ViewProperties,
    ViewStyleProp
} from "react-native";
import {
    Text,
    Button,
    Spinner
} from "native-base";

import Icon from "./../icon/index";

import { style as toastStyle } from "./style";

const alignItemMap: Dictionary<string> = {
    center: "center",
    top: "flex-start",
    bottom: "flex-end"
};

export type ToastConfiguration = {
    /** 提示文字 */
    text?: string;
    /** 提示文字样式 */
    textStyle?: ViewStyleProp;
    /** 按钮文字 */
    buttonText?: string;
    /** 持续时间 - 设为 -1 时将不消失 | default - 800  */
    duration?: number;
    /** 自定义的Icon */
    icon?: {
        type: string;
        size?: "xxs" | "xs" | "md" | "lg" | number;
        color?: string;
        style?: any;
    };
    /** 显示的位置 */
    position?: "top" | "bottom" | "center";
    /** 提示类型 */
    type?: "loading" | "danger" | "success" | "warning";
    supportedOrientations?: any;
    style?: ViewStyleProp;
    /** 按钮文字样式 */
    buttonTextStyle?: ViewStyleProp;
    /** 回调按钮样式 */
    buttonStyle?: ViewStyleProp;
    /** 隐藏蒙层 default - false */
    maskHidden?: boolean;
};

export class ToastContainer extends React.Component<ViewProperties, any> {
    static instance: any;
    static show(config: ToastConfiguration = {}) {
        this.instance.showToast(config);
    };
    static loading(config: ToastConfiguration = {}) {
        this.instance.showToast({
            type: "loading"
        });
    };
    static success(config: ToastConfiguration = {}) {
        this.instance.showToast({
            icon: {
                ...config.icon,
                type: "&#xea55;",
                size: 30,
                color: "#FFF"
            },
            duration: 800,
            ...config
        });
    };
    static info(config: ToastConfiguration) {
        this.instance.showToast({
            icon: {
                ...config.icon,
                type: "&#xe62f;",
                size: 30,
                color: "#FFF"
            },
            duration: 800,
            ...config
        });
    };
    static error(config: ToastConfiguration) {
        this.instance.showToast({
            icon: {
                ...config.icon,
                type: "&#xe60a;",
                size: 30,
                color: "#FFF"
            },
            duration: 800,
            ...config
        });
    };
    static close() {
        this.instance.closeToast();
    }

    constructor(props: ViewProperties, context: any) {
        super(props, context);
        this.state = {
            modalVisible: false,
            fadeAnim: new Animated.Value(0),
        };
    }

    getToastStyle = () => {
        const { fadeAnim, position } = this.state;
        return {
            position: "absolute",
            left: 0,
            top: this.getTop(),
            bottom: this.getTop(),
            right: 0,
            opacity: fadeAnim,
            elevation: 9,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: alignItemMap[position],
        };
    };

    getTop = () => {
        if (Platform.OS === "ios") {
            return 50;
        } else {
            return 0;
        }
    };

    showToast = (config: ToastConfiguration) => {
        this.setState({
            modalVisible: true,
            text: config.text,
            buttonText: config.buttonText,
            type: config.type,
            position: config.position ? config.position : "center",
            supportedOrientations: config.supportedOrientations,
            style: config.style,
            buttonTextStyle: config.buttonTextStyle,
            buttonStyle: config.buttonStyle,
            textStyle: config.textStyle,
            icon: config.icon,
            maskHidden: !!config.maskHidden
        });

        if (config.duration !== -1) {
            setTimeout(() => {
                Animated.timing(this.state.fadeAnim, {
                    toValue: 0,
                    duration: 200
                }).start();
                setTimeout(() => {
                    this.setState({
                        modalVisible: false
                    });
                }, 500);
            }, config.duration || 800);
        }
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 200
        }).start();
    };

    closeToast = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 200
        }).start();
        setTimeout(() => {
            this.setState({
                modalVisible: false
            });
        }, 500);
    };

    render() {
        let {
            modalVisible,
            text,
            buttonText,
            textStyle,
            icon,
            type,
            position,
            style,
            buttonTextStyle,
            buttonStyle,
            maskHidden
        } = this.state;
        const spinnerVisible: boolean = type === "loading" && !icon;

        const containerStyle: any = {
            ...toastStyle.toast,
            ...style,
            backgroundColor: maskHidden ? "transparent" : (toastStyle.toast.backgroundColor || style.backgroundColor)
        };
        
        return modalVisible ? (
            <Animated.View style={this.getToastStyle()}>
                <View
                    style={containerStyle}>
                    {spinnerVisible && <Spinner style={{ height: 50, marginHorizontal: 15 }} size="small" color="#EFEFF4" />}
                    {icon && <Icon style={toastStyle.icon} { ...icon} />}
                    {text && <Text style={{ ...toastStyle.text, ...textStyle }}>
                        {text}
                    </Text>}
                    {buttonText &&
                        <Button
                            style={{ ...toastStyle.button, ...buttonStyle }}
                            onPress={() => this.closeToast()}>
                            <Text style={{ ...toastStyle.buttonText, ...buttonTextStyle }}>
                                {buttonText}
                            </Text>
                        </Button>}
                </View>
            </Animated.View>
        ) : null;
    }
}

