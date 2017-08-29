import React, { Component } from "react";
import {
    WebView
} from "react-native";
import { NavigationScreenProps, NavigationRoute , NavigationNavigatorProps } from "react-navigation";


interface navigationParamsProps {
    title: string;
    url: string;
}
export default class WebViewScreen extends Component<any, any> {
    static navigationOptions = (navigationProps: NavigationNavigatorProps<NavigationRoute<navigationParamsProps>>) => ({
        title: navigationProps.navigation.state.params.title
    })
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            url: this.props.navigation.state.params.url
        };
    }

    render() {
        return (
            <WebView
                style={{ flex: 1 }}
                source={{uri: this.state.url}}
            />
        );
    }
}