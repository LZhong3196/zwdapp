import * as React from "react";
import {
    View,
    Platform,
    Animated,
    ViewProperties,
    ViewStyleProp
} from "react-native";
import ImageView, { ImageViewerPropsDefine } from "react-native-image-zoom-viewer";

export default class ImageViewer extends React.Component<any, any> {
    private ref: any;
    static instance: any;
    static show(config: ImageViewerPropsDefine) {
        this.instance.showViewer(config);
    }
    static close() {
        this.instance.closeViewer();
    }

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            modalVisible: false,
            fadeAnim: new Animated.Value(0),
            config: {}
        };
    }

    getToastStyle = () => {
        const { fadeAnim } = this.state;
        return {
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            opacity: fadeAnim,
            elevation: 9,
            flexDirection: "row",
            justifyContent: "center"
        };
    }

    showViewer = (config: ImageViewerPropsDefine) => {
        this.setState({
            config,
            modalVisible: true
        });
        Animated.timing(this.state.fadeAnim, {
            toValue: 1,
            duration: 200
        }).start();
    }

    closeViewer = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 200
        }).start();
        setTimeout(() => {
            this.setState({
                modalVisible: false
            });
        }, 500);
    }

    render () {
        let {
            modalVisible,
            config
        } = this.state;
        const props: ImageViewerPropsDefine = {
            saveToLocalByLongPress: false, /**默认关闭长按报存到相册, 该功能不支持安卓, 需要自己实现onSave*/
            onClick: this.closeViewer,
            onDoubleClick: this.closeViewer,
            ...config
        };
        return modalVisible ? (
            <Animated.View style={this.getToastStyle()}>
                <ImageView {...props}/>
            </Animated.View>
        ) : null;
    }
}

