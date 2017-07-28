import * as React from "react";
import {
    View,
    ViewProperties
} from "react-native";
import { Root as RootNB } from "native-base";
import { ToastContainer as Toast } from "./../../ui/toast/index";


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
            </RootNB>
        );
    }
}