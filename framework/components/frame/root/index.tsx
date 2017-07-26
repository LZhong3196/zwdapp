import * as React from "react";
import {
    View,
    ViewProperties
} from "react-native";
import { Root as RootNB } from "native-base";
import { ToastContainer as Toast } from "./../../ui/toast/index";

export interface RootProps extends ViewProperties {

}

export default class Root extends React.Component<RootProps, any> {
    private root: any;

    render () {
        return (
            <RootNB ref={(component: any) => this.root = component}>
                {this.props.children}
                <Toast
                    ref={(component: any) => {
                        if (!Toast.instance) {
                            Toast.instance = component;
                        }
                    }}>
                </Toast>
            </RootNB>
        );
    }
}