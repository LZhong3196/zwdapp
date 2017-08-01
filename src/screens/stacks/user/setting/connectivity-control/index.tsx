import * as React from "react";
import {
    Switch
} from "react-native";
import { AppStore, Constants, Networking, Widgets } from "summer";
import * as Immutable from "immutable";

let { Toast } = Widgets;

export default class ConnectivityControl extends React.Component<any, any> {
    render() {
        const value: boolean = !!AppStore.get("user.setting.connect_limit");
        return (
            <Switch
                value={value}
                onValueChange={this.handleValueChange}/>
        );
    }

    handleValueChange = (value: boolean) => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_USER_UPDATE,
            meta: {
                storeKey: "setting.connect_limit"
            },
            payload: value
        });
        (global as any).__CONNECT_LIMIT__ = value;
        if (value) {
            Networking.addConnectivityListener();
        }
        else {
            Networking.removeConnectivityListener();
        }
        Toast.success({
            text: "设置成功"
        });

    }
}
