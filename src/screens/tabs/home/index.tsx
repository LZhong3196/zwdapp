import * as React from "react";
import { connect } from "react-redux";
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    TouchableWithoutFeedback
} from "react-native";
import { APIs, Widgets, AppStore, Constants } from "summer";
let { TabBarIcon } = Widgets;
import { styles } from "./style";
import {
    ListItem,
    Thumbnail,
    Text,
    Body,
    Input,
    Item,
    Left,
    Header,
    Fab,
    Icon,
    Button
} from "native-base";

import HomeSwiper from "./home-swiper";
import HomeNav from "./home-nav";
import RecommendGoods from "./recommend-goods";
import HotSell from "./hot-sell";
import DailyNew from "./daily-new";

class HomeScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_HOME,
        tabBarLabel: "首页",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe6d9;"
                color={options.tintColor}
                size="md"
                focused={options.focused} />
        )
    };
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            blockIndex: 0,
            list: undefined,
            loading: false,
            advertData: {A1: [], A2: { }}
        };
    }
    componentDidMount() {
        this.fetchAdvert();
    }

    render() {
        const {
            navigation
        } = this.props as any;
        return (
            <View style={ styles.view }>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search"/>
                        <Input placeholder="请输入店铺名/档口号/旺旺号" />
                        <Icon name="md-expand"></Icon>
                    </Item>
                </Header>
                <ScrollView
                    style={ styles.view }
                    removeClippedSubviews={ false }
                    showsVerticalScrollIndicator={ false }
                    refreshControl={<RefreshControl
                        refreshing={ this.state.loading }
                        onRefresh={ this.onRefresh }
                        tintColor="gray"
                        progressBackgroundColor="gray"
                        title="下拉刷新"
                    />}
                >
                    <HomeSwiper A1={ this.state.advertData.A1 }/>
                    <HomeNav/>
                    <RecommendGoods A2={ this.state.advertData.A2 }/>
                    <HotSell A3={ this.state.advertData.A2 }/>
                    <DailyNew A4={ this.state.advertData.A2 }/>
                </ScrollView>
            </View>
        );
    }

    onRefresh = () => {
        if (this.state.loading) {
            return;
        }
        this.fetchAdvert();
    }

    fetchAdvert = async () => {
        this.state.loading = true;
        this.setState(this.state);
        try {
            const res: any = await APIs.home.getAdvertList();
            if (!res.data.results) return;
            this.setState({
                loading: false,
                advertData: res.data.results
            });
        }
        catch (e) {

        }
    }

}

const mapStateToProps = (state: any) => ({
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(HomeScreen);