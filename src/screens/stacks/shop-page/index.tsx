import * as React from "react";
import * as Lodash from "lodash";
import { AppStore, AppNavigator, Constants, APIs, Widgets } from "summer";
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
    Tabs
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import GoodsList from "./goods-list";
import { styles } from "./style";

let { Icon } = Widgets;


export default class ShopPageScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerBackTitle: "",
        headerStyle: styles.header
    };

    componentWillMount() {
        this.fetchData();
        this.fetchGoodsList();
    }

    componentWillReceiveProps(nextProps: any) {
        // this.fetchData();
    }

    componentWillUnmount() {
    }

    render() {
        const id: string = this.props.navigation.state.params.id;
        const item: any = AppStore.get(`market.shop.${id}`) || {};
        return (
            <Container>
                <StatusBar barStyle="light-content" />
                <Content style={styles.container}>
                    <View style={styles.bannerContainer}>
                        <Image source={{ uri: item.banner }} style={styles.bannerImage} />
                        <Grid style={styles.marketContainer}>
                            <Row size={3}>
                                <Thumbnail
                                    style={styles.marketAvatar}
                                    source={{ uri: item.avatar }}
                                    large>
                                </Thumbnail>
                            </Row>
                            <Row size={1}>
                                <Text style={styles.marketTitle}>
                                    {item.title || ""}
                                </Text>
                            </Row>
                            <Row size={1}>
                                <Text style={styles.marketCategory}>
                                    {item.category || ""}
                                </Text>
                            </Row>
                            <Row size={1}>
                                <Button
                                    bordered
                                    light={!item.fav}
                                    success={!!item.fav}
                                    small
                                    onPress={this.setFav}
                                    style={styles.favButtonContainer}>
                                    {!item.fav ? (
                                        <Icon
                                            type="&#xe616;"
                                            color="#FFF"
                                            size={16} />
                                    ) : (
                                        <Icon
                                            type="&#xe62e;"
                                            color="#1FC15C"
                                            size={16} />
                                    )}
                                    <Text style={styles.favButtonText}>{!item.fav ? "关注" : "已关注"}</Text>
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
                        <Button vertical>
                            <Text>宝贝分类</Text>
                        </Button>
                        <Button vertical>
                            <Text>档口简介</Text>
                        </Button>
                        <Button vertical>
                            <Text>联系档口</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }

    setFav = async () => {
        const id: string = this.props.navigation.state.params.id;
        const item: any = AppStore.get(`market.shop.${id}`);
        if(!id) return;
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
            AppStore.dispatch({
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
            AppStore.dispatch({
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
            AppStore.dispatch({
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

}

