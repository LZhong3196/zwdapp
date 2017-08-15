import * as React from "react";
import {
    View,
    ScrollView,
    RefreshControl,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity
} from "react-native";
import { APIs, Widgets, Store, Navigator, Constants, Decorators, Routes } from "summer";
let { TabBarIcon, Icon, ImageExtra, theme: {color_base} } = Widgets;
import { styles } from "./style";
import {
    Container,
    Text,
    Icon as BaseIcon
} from "native-base";
import Swiper from "react-native-swiper";
import HomeNav from "./home-nav";
import SearchHeader from "../../../components/search-bar";

@Decorators.pureRender()
@Decorators.connect("user", "home", "data")
class Home extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            loading: false,
            showSwiper: false
        };
    }

    componentDidMount() {
        this.fetchAdvert();
        setTimeout(()=> {
            this.setState({
                showSwiper: true
            });
        }, 0);
    }

    renderSwiper() {
        const advertList: any = Store.get("home.advert") || {};
        const { A1 = [] as any[]} = advertList;

        if(this.state.showSwiper) {
            return (<Swiper
                showsButtons={ false }
                autoplay={ true }
                autoplayTimeout={ 4 }
                height={ 150 }
                showsPagination={ true }
                dotColor={ "#fff" }
                activeDotStyle={ styles.activeDotColor }
            >
                { A1.map(this.createSwiperList) }
            </Swiper>
            )
        } else {
            return <View style={{height: 150}}></View>
        }
    }

    createSwiperList = (item: any, index: number): any => (
        <TouchableWithoutFeedback
            key={ index }
            onPress={ () => this.openShopPage(item.url) }
        >
            <ImageExtra qualityControl="XL"
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
            <ImageExtra qualityControl="XL"
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
            <ImageExtra qualityControl="XL"
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
            <ImageExtra qualityControl="XL"
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
                        <ImageExtra qualityControl="XL"
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
                <ImageExtra qualityControl="XL"
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
        const initAdevert = { header: { image: "https://unsplash.it/g/200/300", shop_id: "0" }, list: [] as any[] };
        const advertList: any = Store.get("home.advert") || {};
        const { A1 = [] as any[], A2 = initAdevert, A3 = initAdevert, A4 = initAdevert, A5 = [] as any[] } = advertList;
        return (
            <Container>
                <SearchHeader
                    placeholder="搜索当季爆款"
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
                   {this.renderSwiper()}
                    <HomeNav/>
                    <View style={ styles.title }>
                        <View style={ styles.titleLine }></View>
                        <Text> 推荐宝贝</Text>
                        <View style={ styles.titleLine }></View>
                    </View>
                    <TouchableWithoutFeedback
                        onPress={ () => this.openShopPage(A2.header.shop_id) }
                    >
                        <ImageExtra qualityControl="XL"
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
                        <ImageExtra qualityControl="XL"
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
        Navigator.to(Routes.ROUTES_SCANNER);
    }
    openShopPage = (id: string) => {
        if (!id) return;
        Navigator.to(Routes.ROUTES_SHOP, { id });
    }
    openGoodsPage = (id: string) => {
        if (!id) return;
        Navigator.to(Routes.ROUTES_GOODS, { id });
    }
    openNotificationListPage = () => {
        Navigator.to(Routes.ROUTES_NOTIFICATION);
    }
    fetchAdvert = async () => {
        this.setState({
            loading: false
        });
        try {
            const res: any = await APIs.home.getAdvertList();
            Store.update("home.advert", res.data);
        }
        catch (e) {

        }
    }
}

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

    componentWillMount() {
        if (!Navigator.tabNavigation) {
            Navigator.tabNavigation = this.props.navigation;
        }
    }

    componentWillUnmount() {
        Navigator.tabNavigation = undefined;
    }
    render() {
        return (
            <Home />
        );
    }
}