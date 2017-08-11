import * as React from "react";
import { Widgets, Decorators } from "summer";
let { Icon } = Widgets;
import {
    Fab
} from "native-base";
import {LayoutAnimation, NativeModules} from "react-native";
import { styles } from "./style";
import {func} from "prop-types";
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

interface ScrollToTopProps {
    bindRef: any;
}
@Decorators.pureRender()
export default class ScrollToTop extends React.Component<ScrollToTopProps, any> {
    constructor(props: any, context: any) {
      super(props, context);
      /** { props.bindRef } is a scroll component ref and it must has function scrollToTop*/
      this.state = {
          width: 0,
          height: 0
      };
    }
    render() {
        return (
            <Fab
                position="bottomRight"
                style={{ ...styles.scrollToTop, width: this.state.width , height: this.state.height }}
                onPress={ this.scrollToTop }>
                <Icon type="&#xe60d;" color="#F85E3B" />
            </Fab>
        );
    }
    scrollToTop = () => {
        this.props.bindRef.scrollToTop && this.props.bindRef.scrollToTop();
    }
    showButton = () => {
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut
            }
        });
        this.setState({
            width: 30,
            height: 30
        });
    }
    hideButton = () => {
        LayoutAnimation.configureNext({
            duration: 500,
            create: {
                type: LayoutAnimation.Types.linear,
                property: LayoutAnimation.Properties.opacity,
            },
            update: {
                type: LayoutAnimation.Types.easeInEaseOut
            }
        });
        this.setState({
            width: 0,
            height: 0
        });
    }
}