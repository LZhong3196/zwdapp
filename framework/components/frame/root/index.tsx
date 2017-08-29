import * as React from "react";
import {
    View,
    ViewProperties
} from "react-native";
import { Root as RootNB } from "native-base";
import { ToastContainer as Toast } from "./../../ui/toast/index";
import ImageViewer from "./../../ui/image-viewer/index";


export default class Root extends React.Component<ViewProperties, any> {
    render () {
        return (
            <RootNB>
                {this.props.children}
                <Toast
                    ref={(component: any) => {
                        if (!Toast.instance) {
                            Toast.instance = component;
                        }
                    }}>
                </Toast>
                <ImageViewer
                    ref={(component: any) => {
                        if (!ImageViewer.instance) {
                            ImageViewer.instance = component;
                        }
                    }}>
                </ImageViewer>
            </RootNB>
        );
    }
}