import * as React from "react";
import {
    View,
    ViewProperties,
    Platform,
    ViewStyle,
    Animated
} from "react-native";

export interface HeaderProps {
    style?: ViewStyle;
}
const ios: boolean = Platform.OS === "ios";
export default class Header extends React.Component<HeaderProps, any> {
    private height: number;
    private animating: boolean = false;
    static defaultProps = {
        style: {}
    };
    constructor(props: HeaderProps) {
        super(props);
        this.state = {
            marginTop: new Animated.Value(ios ? 20 : 0)
        };
    }
    componentDidMount() {
        this.state.marginTop.addListener((e: any) => {
            console.log(e);
        });
    }
    render() {
        const {
            style
        } = this.props;
        this.height = Number(style.height) || 50;
        const headerStyle: ViewStyle = {
            marginTop: this.state.marginTop,
            flexDirection: "row",
            height: 50,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderBottomColor: "#aaa",
            ...style
        };
        const props: any = {...this.props};
        delete props.style;
        return (
            <Animated.View {...props} style={headerStyle}/>
        );
    }
    hide = () => {
        if (!this.animating) {
            this.animating = true;
            Animated.timing(
                this.state.marginTop,
                {
                    toValue: ios ? (- this.height - 20) : (- this.height),
                }
            ).start(() => {
                this.animating = false;
            });
        }
    }
    show = () => {
        if (!this.animating) {
            this.animating = true;
            Animated.timing(
                this.state.marginTop,
                {
                    toValue: ios ? 20 : 0,
                }
            ).start(() => {
                this.animating = false;
            });
        }
    }
}