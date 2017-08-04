import * as React from "react";
import {
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./style";
import { AppStore, Constants, Widgets, Decorators } from "summer";
const { ImageExtra } = Widgets;

@Decorators.pureRender()
class HomeNav extends React.Component<any, any> {
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
                <TouchableOpacity
                    onPress={ () => this.navTo("Login") }
                >
                    <ImageExtra
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => this.navTo("Login") }
                >
                    <ImageExtra
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => this.navTo("Login") }
                >
                    <ImageExtra
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => this.navTo("Login") }
                >
                    <ImageExtra
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () => this.navTo("Login") }
                >
                    <ImageExtra
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableOpacity>
            </ScrollView>
        );
    }
    navTo = (target: string) => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_LOGGED_OUT,
            meta: {

            }
        } as any);
    }
}


const mapStateToProps = (state: any) => ({
    user: state.get("user").toJS()
});


export default connect(mapStateToProps)(HomeNav);