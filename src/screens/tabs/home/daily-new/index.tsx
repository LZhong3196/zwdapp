import { PureComponent } from "react";
import {
    View,
    ScrollView,
    TouchableWithoutFeedback,
    Image,
    Text
} from "react-native";
import { connect } from "react-redux";
import { styles } from "./style";
import { AppStore, AppNavigator, Constants, Widgets } from "summer";

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
            <View>
                <View style={ styles.title }>
                    <View style={ styles.titleLine }></View>
                    <Text> 每日新款</Text>
                    <View style={ styles.titleLine }></View>
                </View>
                <ScrollView
                    style={ styles.listScroll }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    { this.renderList() }
                </ScrollView>
            </View>
        );
    }
    private renderList = (): any => {
        const { list = [] }: { list: any[] } = this.props.A4;
        console.log(list);
        return list.map((item: any, index: number) => (
            <TouchableWithoutFeedback
                key={ index }
                onPress={ () => this.navToGoodsPage(item.goods_id) }
            >
                <Image
                    style={ styles.listImage }
                    source={{ uri: item.image }}
                />
            </TouchableWithoutFeedback>
        ));
    }
    navToGoodsPage = (target: string) => {
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