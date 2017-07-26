/** TODO - stylesheet | api extend */
/** Fork from NativeBase/toast */
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
} from "native-base";

import { style as toastStyle } from "./style";

interface ToastProps extends ViewProperties {
    type?: "default" | "success" | "warning" | "danger";
}

class Toast extends React.Component<ToastProps, any> {
    private root: any;
    render() {
        return (
            <View
                ref={(component: any) => this.root = component}
                {...this.props}>
            </View>
        );
    }
}

export type ToastConfiguration = {
    text: string;
    buttonText: string;
    position: 'top' | 'bottom' | 'center';
    type?: 'danger' | 'success' | 'warning';
    duration?: number;
    supportedOrientations?: any;
    style?: ViewStyleProp;
    buttonTextStyle?: ViewStyleProp;
    buttonStyle?: ViewStyleProp;
    textStyle?: ViewStyleProp;
};

export interface ToastContainerProps extends ViewProperties {

}

export class ToastContainer extends React.Component<ToastContainerProps, any> {
    static instance: any;
    static show({ ...config }) {
        this.instance.showToast(config);
    };

    constructor(props: ToastContainerProps, context: any) {
        super(props, context);
        this.state = {
            modalVisible: false,
            fadeAnim: new Animated.Value(0),
        };
    }

    getToastStyle = () => {
        return {
            position: "absolute",
            opacity: this.state.fadeAnim,
            width: "100%",
            elevation: 9,
            paddingHorizontal: Platform.OS === "ios" ? 20 : 0,
            top: this.state.position === "top" ? this.getTop() : undefined,
            bottom: this.state.position === "bottom" ? this.getTop() : undefined,
        };
    };

    getTop = () => {
        if (Platform.OS === "ios") {
            return 30;
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
            position: config.position ? config.position : "bottom",
            supportedOrientations: config.supportedOrientations,
            style: config.style,
            buttonTextStyle: config.buttonTextStyle,
            buttonStyle: config.buttonStyle,
            textStyle: config.textStyle
        });

        if (config.duration > 0) {
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
            }, config.duration);
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
        let { modalVisible } = this.state;
        return modalVisible ? (
            <Animated.View style={this.getToastStyle()}>
                <Toast
                    style={{ ...toastStyle.toast, ...this.state.style }}
                    type={this.state.type}>
                    <Text style={{ ...toastStyle.text, ...this.state.textStyle }}>
                        {this.state.text}
                    </Text>
                    {this.state.buttonText &&
                        <Button
                            style={{ ...toastStyle.button, ...this.state.buttonStyle }}
                            onPress={() => this.closeToast()}>
                            <Text style={{ ...toastStyle.buttonText, ...this.state.buttonTextStyle }}>
                                {this.state.buttonText}
                            </Text>
                        </Button>}
                </Toast>
            </Animated.View>
        ) : null;
    }
}

