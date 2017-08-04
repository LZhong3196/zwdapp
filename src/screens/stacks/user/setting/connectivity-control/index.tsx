import * as React from "react";
import {
    Switch
} from "react-native";
import { Store, Constants, Networking, Widgets } from "summer";
import * as Immutable from "immutable";

let { Toast } = Widgets;

export default class ConnectivityControl extends React.Component<any, any> {
    render() {
        const value: boolean = !!Store.get("user.setting.connect_limit");
        return (
            <Switch
                value={value}
                onValueChange={this.handleValueChange}/>
        );
    }

    handleValueChange = (value: boolean) => {
        Store.update("user.setting.connect_limit", value);
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
