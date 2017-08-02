import { PureComponent } from "react";
import {
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./style";
import { AppStore, Constants, Widgets, Decorators } from "summer";

@Decorators.pureRender()
class HomeNav extends PureComponent<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            blockIndex: 0,
            list: undefined,
            loading: false,
            advertData: {A1: [], A2: {}}
        };
    }

    render() {
        return (
            <ScrollView
                style={ styles.navScroll }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo("Login") }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo("Login") }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo("Login") }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo("Login") }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={ () => this.navTo("Login") }
                >
                    <Image
                        style={ styles.homeNavImage }
                        source={ require("./images/HomeNavImage.jpg") }
                    />
                </TouchableWithoutFeedback>
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