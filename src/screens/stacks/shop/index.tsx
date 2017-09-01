import * as React from "react";
import * as Lodash from "lodash";
import { Store, Constants, APIs, Widgets, Decorators, Navigator, Routes } from "summer";
import { Image, View, StatusBar } from "react-native";
import {
    Button,
    Text,
    Container,
    Card,
    Content,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Right,
    Footer,
    FooterTab,
    Tab,
    Tabs,
    Drawer,
    Header,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import GoodsList from "./goods-list";
import CategoryList from "./category-list";
import { styles } from "./style";

let { Icon, Toast } = Widgets;

@Decorators.connect("user")
export default class ShopScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any
    };

    constructor(props: any) {
        super(props);

        this.state = {
            showDrawer: false
        };
    }

    componentWillMount() {
        this.fetchData();
        this.fetchGoodsList();
    }

    componentWillReceiveProps(nextProps: any) {
        // this.fetchData();
    }

    componentWillUnmount() {
    }

    drawer: any;

    render() {
        const id: string = this.props.navigation.state.params.id;
        const item: any = Store.get(`market.shop.${id}`) || {};
        const { showDrawer } = this.state;

        return (
            <Drawer
                ref={ (ref) => { this.drawer = ref; } }
                content={ <CategoryList categories={ item.categories } onItemPress={ this.onClickCategoryItem } /> }
                onClose={ this.closeDrawer }
                type="overlay"
                side="right"
            >
                <View style={ styles.headerContainer }>
                    <Header style={ styles.header } iosBarStyle={ showDrawer ? "dark-content" : "light-content" }>
                        <Left>
                            <Button transparent onPress={ () => { Navigator.back(); } }>
                                <Icon type="&#xea53;" color="#007aff" />
                            </Button>
                        </Left>
                    </Header>
                </View>
                <Content style={ styles.container }>
                    <View style={ styles.bannerContainer }>
                        <Image source={ { uri: item.banner } } style={ styles.bannerImage } />
                        <Grid style={ styles.marketContainer }>
                            <Row size={ 3 }>
                                <Thumbnail
                                    style={ styles.marketAvatar }
                                    source={ { uri: item.avatar } }
                                    large>
                                </Thumbnail>
                            </Row>
                            <Row size={ 1 }>
                                <Text style={ styles.marketTitle }>
                                    { item.title || "" }
                                </Text>
                            </Row>
                            <Row size={ 1 }>
                                <Text style={ styles.marketCategory }>
                                    { item.address || "" }
                                </Text>
                            </Row>
                            <Row size={ 1 }>
                                <Button
                                    bordered
                                    light={ !item.fav }
                                    success={ !!item.fav }
                                    small
                                    onPress={ this.setFav }
                                    style={ styles.favButtonContainer }>
                                    { !item.fav ? (
                                        <Icon
                                            type="&#xe616;"
                                            color="#FFF"
                                            size={ 16 } />
                                    ) : (
                                            <Icon
                                                type="&#xe62e;"
                                                color="#1FC15C"
                                                size={ 16 } />
                                        ) }
                                    <Text style={ styles.favButtonText }>{ !item.fav ? "关注" : "已关注" }</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </View>
                    <Tabs>
                        <Tab heading="默认排序">
                            <GoodsList />
                        </Tab>
                        <Tab heading="上新">

                        </Tab>
                        <Tab heading="价格">

                        </Tab>
                    </Tabs>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button onPress={ this.openDrawer } style={ styles.btnWidthRightBorder }>
                            <Text>宝贝分类</Text>
                        </Button>
                        <Button style={ styles.btnWidthRightBorder } onPress={ this.goToProfile }>
                            <Text>档口简介</Text>
                        </Button>
                        <Button>
                            <Text>联系档口</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Drawer>
        );
    }

    setFav = async () => {
        const id: string = this.props.navigation.state.params.id;
        const item: any = Store.get(`market.shop.${id}`);
        if (!id) return;
        let value: boolean = !!item.fav;
        try {
            let res: any;
            if (value) {
                res = await APIs.market.postShopFavRemove({ u_id: id });
            }
            else {
                res = await APIs.market.postShopFavAdd({ u_id: id });
            }
            let newItem: any = Lodash.assign({}, item, {
                fav: !value
            });
            Store.dispatch({
                type: Constants.ACTIONTYPES_MARKET_UPDATE,
                meta: {
                    storeKey: `shop.${id}`,
                },
                payload: newItem
            });
        }
        catch (e) {

        }
    }

    fetchData = async () => {
        const id: string = this.props.navigation.state.params.id;
        try {
            const res: any = await APIs.market.getShopInfo({ id: id });
            Store.dispatch({
                type: Constants.ACTIONTYPES_MARKET_UPDATE,
                meta: {
                    storeKey: `shop.${id}`,
                },
                payload: res.data
            });
        }
        catch (e) {

        }
    }

    fetchGoodsList = async () => {
        const id: string = this.props.navigation.state.params.id;
        try {
            const res: any = await APIs.market.getShopGoodsList({ u_id: id });
            Store.dispatch({
                type: Constants.ACTIONTYPES_MARKET_UPDATE,
                meta: {
                    storeKey: "goods",
                },
                payload: res.data.results
            });
        }
        catch (e) {

        }
    }

    closeDrawer = () => {
        this.drawer._root.close();

        this.setState({
            showDrawer: false
        });
    }

    openDrawer = () => {
        this.drawer._root.open();

        this.setState({
            showDrawer: true
        });
    }

    onClickCategoryItem = (id: string) => {
        this.closeDrawer();
    }

    goToProfile = () => {
        const id: string = this.props.navigation.state.params.id;

        Navigator.to(Routes.ROUTES_SHOP_PROFILE, { id });
    }

}

