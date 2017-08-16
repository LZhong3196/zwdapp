import * as React from "react";
import {
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { styles } from "./style";
import { Store, Navigator, Constants, Widgets, Decorators } from "summer";
const { ImageExtra } = Widgets;

@Decorators.connect("user")
@Decorators.pureRender()
export default class HomeNav extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    render() {
        return (
            <ScrollView
                style={ styles.navScroll }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo(Constants.ROUTES_LOGIN) }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/newStyle.png") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo(Constants.ROUTES_LOGIN) }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/newStyle.png") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo(Constants.ROUTES_LOGIN) }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/newStyle.png") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo(Constants.ROUTES_LOGIN) }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/newStyle.png") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo(Constants.ROUTES_LOGIN) }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/newStyle.png") }
                    />
                </TouchableWithoutFeedback>
            </ScrollView>
        );
    }
    navTo = (target: string) => {
        Navigator.to(target);
    }
}