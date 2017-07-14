/** From antd-mobile */
import * as React from "react";
import {
    ActivityIndicator,
    TouchableHighlight,
    Text,
    StyleSheet,
    View
} from "react-native";
import buttonStyles from "./styles";


export interface ButtonProps {
    type?: 'primary' | 'warning' | 'ghost';
    size?: 'large' | 'small';
    activeStyle?: boolean | Object;
    disabled?: boolean;
    onClick?: (e?: any) => void;
    onPressIn?: (e?: any) => void;
    onPressOut?: (e?: any) => void;
    onShowUnderlay?: (e?: any) => void;
    onHideUnderlay?: (e?: any) => void;
    loading?: boolean;
    delayPressIn?: number;
    delayPressOut?: number;
    style?: React.CSSProperties;
    styles?: {
        primaryRawText?: {},
        warningRawText?: {},
        ghostRawText?: {},
        largeRawText?: {},
        smallRawText?: {},
        disabledRawText?: {},
        wrapperStyle?: {},
        disabledRaw?: {},
        container?: {},
        indicator?: {},
    };
}

export default class Button extends React.Component<any, any> {
    static defaultProps = {
        size: "large",
        type: "primary",
        onClick: (e?: any) => { },
        onPressIn: (e?: any) => { },
        onPressOut: (e?: any) => { },
        onShowUnderlay: (e?: any) => { },
        onHideUnderlay: (e?: any) => { },
        styles: buttonStyles,
    };

    constructor(props: ButtonProps, context: any) {
        super(props, context);
        this.state = {
            pressIn: false,
            touchIt: false,
        };

    }

    render() {
        const {
            size,
            type,
            disabled,
            activeStyle,
            onClick,
            style,
            styles,
            loading,
            ...restProps
        } = this.props as any;

        const buttonStyles = styles;

        ["activeOpacity", "underlayColor", "onPress", "onPressIn", "onPressOut", "onShowUnderlay", "onHideUnderlay"].forEach((prop) => {
            if (restProps.hasOwnProperty(prop)) {
                delete restProps[prop];
            }
        });

        const textStyle = [
            buttonStyles[`${size}RawText`],
            buttonStyles[`${type}RawText`],
            disabled && buttonStyles.disabledRawText,
            this.state.pressIn && buttonStyles[`${type}HighlightText`],
        ];

        const wrapperStyle = [
            buttonStyles.wrapperStyle,
            buttonStyles[`${size}Raw`],
            buttonStyles[`${type}Raw`],
            disabled && buttonStyles.disabledRaw,
            this.state.pressIn && activeStyle && buttonStyles[`${type}Highlight`],
            activeStyle && this.state.touchIt && activeStyle,
            style,
        ];

        const underlayColor = StyleSheet.flatten(
            buttonStyles[activeStyle ? `${type}Highlight` : `${type}Raw`],
        ).backgroundColor;

        const indicatorColor = (StyleSheet.flatten(
        this.state.pressIn ? buttonStyles[`${type}HighlightText`] : buttonStyles[`${type}RawText`],
        ) as any).color;

        return (
            <TouchableHighlight
                activeOpacity={1}
                underlayColor={underlayColor}
                style={wrapperStyle}
                onPress={(e?: any) => onClick && onClick(e)}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
                onShowUnderlay={this.onShowUnderlay}
                onHideUnderlay={this.onHideUnderlay}
                disabled={disabled}
                {...restProps}>
                <View style={buttonStyles.container}>
                {
                    loading ? (
                    <ActivityIndicator
                        style={buttonStyles.indicator}
                        animating
                        color={indicatorColor}
                        size="small"
                    />
                    ) : null
                }
                <Text style={textStyle as any}>{this.props.children}</Text>
                </View>

            </TouchableHighlight>
        );
    }

    onPressIn = (...arg: any[]) => {
        this.setState({ pressIn: true });
        if (this.props.onPressIn) {
            (this.props.onPressIn as any)(...arg);
        }
    };

    onPressOut = (...arg: any[]) => {
        this.setState({ pressIn: false });
        if (this.props.onPressOut) {
            (this.props.onPressOut as any)(...arg);
        }
    };

    onShowUnderlay = (...arg: any[]) => {
        this.setState({ touchIt: true });
        if (this.props.onShowUnderlay) {
            (this.props.onShowUnderlay as any)(...arg);
        }
    };
    onHideUnderlay = (...arg: any[]) => {
        this.setState({ touchIt: false });
        if (this.props.onHideUnderlay) {
            (this.props.onHideUnderlay as any)(...arg);
        }
    };
}