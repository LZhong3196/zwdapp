import * as React from "react";
import {
    ScrollView,
    RefreshControl,
    TouchableOpacity
} from "react-native";
import { APIs, Widgets, Store, Navigator, Constants, Decorators, Routes } from "summer";
let { TabBarIcon, Icon, theme: {color_base} } = Widgets;
import { styles } from "./style";
import {
    Container,
} from "native-base";
import SearchHeader from "../../../components/search-bar";
import HomeNav from "./home-nav";
import HomeSwiper from "./home-swiper";
import RecommendGoods from "./recommend-goods";
import HotSell from "./hot-sell";
import AdvertList from "./advert-list";

@Decorators.connect("home", "data")
@Navigator.connectTabNavigation()
export default class HomeScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: "Routes.ROUTES_HOME",
        tabBarLabel: "首页",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe6d9;"
                activeType="&#xe603;"
                focused={options.focused} />
        )

    };
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.fetchAdvert();
    }


    render() {
       return (
            <Container>
                <SearchHeader
                    placeholder="搜索当季爆款"
                    onFocus={this.openFilterSearchPage}
                    rightButton={
                        <TouchableOpacity
                            onPress={ this.openNotificationListPage }>
                            <Icon color={color_base} type="&#xe601;"/>
                        </TouchableOpacity>
                    }
                />
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
                    <HomeSwiper/>
                    <HomeNav/>
                    <RecommendGoods/>
                    <HotSell/>
                    <AdvertList/>
                </ScrollView>
            </Container>
        );
    }

    onRefresh = () => {
        if (this.state.loading) {
            return;
        }
        this.setState({
            loading: false
        }, this.fetchAdvert);
    }
    openFilterSearchPage = () => {
        Navigator.to(Routes.ROUTES_FIELD_SEARCH, { origin: Routes.ROUTES_TAB_HOME });
    }
    openNotificationListPage = () => {
        Navigator.to(Routes.ROUTES_NOTIFICATION);
    }
    fetchAdvert = async () => {
        try {
            const res: any = await APIs.home.getAdvertList();
            Store.update("home.advert", res.data);
        }
        catch (e) {

        }
    }
}
