import { PureComponent } from "react";
import {
    ScrollView,
    TouchableWithoutFeedback,
    Image
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./style";
import { AppStore, AppNavigator, Constants } from "summer";
import * as Swiper from "react-native-swiper";

class HomeNav extends PureComponent<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    render() {
        return (
            <Swiper
                showsButtons={false}
                autoplay={true}
                autoplayTimeout={4}
                height={150}
                showsPagination={true}
                dotColor={"#fff"}
                activeDotStyle={ styles.activeDotColor }
            >
                { this.props.A1.map(this.renderSwiper) }
            </Swiper>
        );
    }
    private renderSwiper = (item: any, index: number): any => (
        <TouchableWithoutFeedback
            key={ index }
            onPress={ () => this.navTo(item.url) }
        >
            <Image
                style={ styles.swiperItem }
                source={{ uri: item.image }}
            />
        </TouchableWithoutFeedback>
    )
    navTo = (target: string) => {
        /** TODO create webView page and action */
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