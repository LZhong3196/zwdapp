import * as React from "react";
import {
    View,
    ViewProperties,
    Platform,
    ViewStyle
} from "react-native";

export interface HeaderProps {
    style?: ViewStyle;
}

export default class Header extends React.Component<HeaderProps, any> {
    static defaultProps = {
        style: {}
    };
    render() {
        const {
            style
        } = this.props;
        const ios = Platform.OS === "ios";
        const headerStyle: ViewStyle = {
            marginTop: ios ? 20 : 0,
            flexDirection: "row",
            height: 50,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#aaa",
            zIndex: 4,
            elevation: 4,
            ...style
        };
        return (
            <View style={headerStyle}>
                {this.props.children}
            </View>
        );
    }
}