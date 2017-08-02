import * as React from "react";
import { connect } from "react-redux";
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import { APIs, Widgets, AppStore, Constants, Decorators } from "summer";
let { TabBarIcon, Icon } = Widgets;
import { styles } from "./style";
import {
    Container,
    Thumbnail,
    Text,
    Body,
    Input,
    Item,
    Left,
    Right,
    Header,
    Fab,
    Icon as BaseIcon,
    Button,
    Card,
    CardItem
} from "native-base";
import * as Swiper from "react-native-swiper";
import HomeNav from "./home-nav";
import {func} from "prop-types";

@Decorators.pureRender()
class HomeScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_HOME,
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
            loading: false,
        };
    }
    componentDidMount() {
        this.fetchAdvert();
    }

    createSwiperList = (item: any, index: number): any => (
        <TouchableWithoutFeedback
            key={ index }
            onPress={ () => this.openShopPage(item.url) }
        >
            <Image
                style={ styles.swiperItem }
                source={{ uri: item.image }}
            />
        </TouchableWithoutFeedback>
    )
    createRecommendGoodsList = (item: any, index: number) => (
        <TouchableWithoutFeedback
            key={ index }
            onPress={ () => this.openGoodsPage(item.goods_id) }
        >
            <Image
                style={ styles.RecommendGoodsListImage }
                source={{ uri: item.image }}
            />
        </TouchableWithoutFeedback>
    )
    createHotSellList = (item: any, index: number) => (
        <TouchableWithoutFeedback
            key={ index }
            onPress={ () => this.openGoodsPage(item.goods_id) }
        >
            <Image
                style={ styles.hotSellListImage }
                source={{ uri: item.image }}
            />
        </TouchableWithoutFeedback>
    )
    createDailyNewList = (item: any, index: number) => (
        <TouchableWithoutFeedback
            key={ index }
            onPress={ () => this.openGoodsPage(item.goods_id) }
        >
            <Image
                style={ styles.dailyNewListImage }
                source={{ uri: item.image }}
            />
        </TouchableWithoutFeedback>
    )
    createAdvertList = (item: any, index: number) => {
        const createList = (item: any, index: number) => {
            return (
                <TouchableWithoutFeedback
                    key={ index }
                    onPress={ () => this.openGoodsPage(item.goods_id) }
                >
                    <View
                        style={ styles.advertListItem }
                    >
                        <Image
                            style={ styles.advertListImage }
                            source={{ uri: item.image }}
                        />
                        <Text>{ item.title }</Text>
                        <Text style={ styles.price }>¥ { item.price }</Text>
                    </View>
                </TouchableWithoutFeedback>
            );
        };
        return (
        <View key={ index }>
            <TouchableWithoutFeedback
                onPress={ () => this.openShopPage(item.header.shop_id) }
            >
                <Image
                    style={ styles.headerImage }
                    source={{ uri: item.header.image }}
                />
            </TouchableWithoutFeedback>
            <View style={ styles.advertListContainer }>
                { item.list.map(createList) }
            </View>
        </View>
        );
    }
    render() {
        const initAdevert = { header: { image: "https://unsplash.it/g/200/300", shop_id: "0" }, list: [] };
        const advertList: any = AppStore.get("home.advert") || {};
        const { A1 = [], A2 = initAdevert, A3 = initAdevert, A4 = initAdevert, A5= [] } = advertList;
        return (
            <Container>
                <Header searchBar rounded>
                    <Button small transparent>
                        <Text>广州</Text><Icon type="&#xe61a;"/>
                    </Button>
                    <Item>
                        <BaseIcon name="search"/>
                        <Input placeholder="请输入店铺名/档口号/旺旺号" />
                        <Button onPress={ this.openQRScanner }><BaseIcon name="md-expand"/></Button>
                    </Item>
                    <TouchableOpacity small transparent
                        onPress={ this.openNotificationListPage }>
                        <Icon type="&#xe62b;" />
                    </TouchableOpacity>
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
                    <Swiper
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={4}
                        height={150}
                        showsPagination={true}
                        dotColor={"#fff"}
                        activeDotStyle={ styles.activeDotColor }
                    >
                        { A1.map(this.createSwiperList) }
                    </Swiper>
                    <HomeNav/>
                    <View style={ styles.title }>
                        <View style={ styles.titleLine }></View>
                        <Text> 推荐宝贝</Text>
                        <View style={ styles.titleLine }></View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={ () => this.openShopPage(A2.header.shop_id) }
                    >
                        <Image
                            style={ styles.headerImage }
                            source={{ uri: A2.header.image }}
                        />
                    </TouchableWithoutFeedback>
                    <ScrollView
                        style={ styles.RecommendGoodsListScroll }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        { A2.list.map(this.createRecommendGoodsList) }
                    </ScrollView>
                    <View style={ styles.title }>
                        <View style={ styles.titleLine }></View>
                        <Text> 精品热卖</Text>
                        <View style={ styles.titleLine }></View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={ () => this.openShopPage(A3.header.shop_id) }
                    >
                        <Image
                            style={ styles.headerImage }
                            source={{ uri: A3.header.image }}
                        />
                    </TouchableWithoutFeedback>
                    <View style={ styles.hotSellListWrap }>
                        { A3.list.map(this.createHotSellList) }
                    </View>
                    <View style={ styles.title }>
                        <View style={ styles.titleLine }></View>
                        <Text> 每日新款</Text>
                        <View style={ styles.titleLine }></View>
                    </View>
                    <ScrollView
                        style={ styles.dailyNewListScroll }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        { A4.list.map(this.createDailyNewList) }
                    </ScrollView>
                    { A5.map(this.createAdvertList) }
                </ScrollView>
            </Container>
        );
    }

    onRefresh = () => {
        if (this.state.loading) {
            return;
        }
        this.fetchAdvert();
    }
    openQRScanner = () => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_QRSCANNER,
                params: {
                }
            }
        });
    }
    openShopPage = (id: string) => {
        if (!id) return;
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_SHOP,
                params: {
                    id: id
                }
            }
        });
    }
    openGoodsPage = (id: string) => {
        if (!id) return;
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_GOODS,
                params: {
                    id: id
                }
            }
        });
    }
    openNotificationListPage = () => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_NOTIFICATION_LIST,
            }
        });
    }

    fetchAdvert = async () => {
        this.setState({
            loading: false
        });
        try {
            const res: any = await APIs.home.getAdvertList();
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_HOME_UPDATE,
                meta: {
                    storeKey: "advert",
                },
                payload: res.data
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