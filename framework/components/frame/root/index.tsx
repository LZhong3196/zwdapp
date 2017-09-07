import * as React from "react";
import {
    View,
    ViewProperties
} from "react-native";
import { Root as RootNB } from "native-base";
import { ToastContainer as Toast } from "./../../ui/toast/index";
import ImageViewer from "./../../ui/image-viewer/index";
import ActionSheet from "./../../ui/actionsheet";
import Popover from "./../../ui/popover";


export default class Root extends React.Component<ViewProperties, any> {
    render() {
        return (
            <RootNB>
                { this.props.children }
                <Toast
                    ref={ (component: any) => {
                        if (!Toast.instance) {
                            Toast.instance = component;
                        }
                    } }>
                </Toast>
                <ImageViewer
                    ref={ (component: any) => {
                        if (!ImageViewer.instance) {
                            ImageViewer.instance = component;
                        }
                    } }>
                </ImageViewer>
                <ActionSheet ref={ (component: any) => {
                    if (!ActionSheet.actionsheetInstance) {
                        ActionSheet.actionsheetInstance = component;
                    }
                } } />
                <Popover ref={ (ref: any) => {
                    if (!Popover.instance) {
                        Popover.instance = ref;
                    }
                } }
                >
                </Popover>
            </RootNB>
        );
    }
}