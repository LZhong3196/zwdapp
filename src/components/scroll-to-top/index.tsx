import { PureComponent } from "react";
import { Widgets} from "summer";
let { Icon } = Widgets;
import {
    Fab
} from "native-base";

import { styles } from "./style";

export default class ScrollToTop extends PureComponent<any> {
    constructor(props: any) {
      super(props);
      /** { props.bindRef } is a scroll component ref and it must has function scrollToTop*/
    }
    render() {
        return (
            <Fab
                position="bottomRight"
                style={ styles.scrollToTop }
                onPress={ this.scrollToTop }>
                <Icon type="&#xe60d;" color="#F85E3B" />
            </Fab>
        );
    }
    scrollToTop = () => {
        this.props.bindRef.scrollToTop();
    }
}