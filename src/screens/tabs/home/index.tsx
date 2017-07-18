import * as React from "react";
import {
    View
} from "react-native";
import { Constants, Widgets } from "summer";
let { TabBarIcon } = Widgets;


export default class HomeScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_HOME,
        tabBarLabel: "首页",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe6d9;"
                color={options.tintColor}
                size="md"
                focused={options.focused} />
        )
    };

    render() {
        const {
            navigation
        } = this.props as any;
        return (
            <View>
               
            </View>
        );
    }


}