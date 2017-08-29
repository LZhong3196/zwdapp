import * as React from "react";
import * as Lodash from "lodash";
import { Store, Constants, APIs, Widgets, Decorators, Navigator, Routes } from "summer";
import {
    StyleSheet,
    View,
    Slider,
    TouchableOpacity
} from "react-native";
import {
    Button,
    Text,
    Container,
    Card,
    Content,
    Thumbnail,
    Tabs,
    Tab,
    Left,
    Body,
    Right,
    Footer,
    FooterTab,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Swiper from "react-native-swiper";
import { styles } from "./style";

let { Icon, ImageExtra, ImageViewer } = Widgets;

@Decorators.connect("user", "goods")
export default class GoodsScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerBackTitle: "",
        headerStyle: styles.header
    };

    constructor(props: any) {
        super(props);

        this.state = {
            showSwiper: false
        };
    }

    componentWillMount() {
        this.fetchData();

        setTimeout(() => {
            this.setState({
                showSwiper: true
            });
        }, 1000);
    }

    componentWillReceiveProps(nextProps: any) {

    }

    componentWillUnmount() {
    }

    render() {
        const id: string = this.props.navigation.state.params.id;
        const item: any = Store.get(`goods.goods.${id}`) || {};
        const banner: string[] = item.banner || [];
        return (
            <Container>
                <Content>
                    {this.renderSwiper(banner)}
                    <Grid style={ styles.infoContainer }>
                        <Col style={ styles.leftContainer }>
                            <Row style={ styles.titleWrap }><Text style={ styles.goodsTitle }>{ item.title }</Text></Row>
                            <Row><Text style={ styles.themeColor }>¥ <Text style={ styles.price }> { item.price } </Text></Text><View style={ styles.tags }><Text style={ styles.tagTitle }>拿货优惠价</Text></View></Row>
                            <Row><Text style={ styles.taobaoPrice }>淘宝价 </Text><Text style={{ ...styles.taobaoPrice,
                                textDecorationLine: "line-through" }}> ¥ { item.taobao_price }</Text></Row>
                        </Col>
                        <Col style={ styles.rightContainer }>
                            <Row style={ styles.shareButtonWrap }><Button vertical transparent><Icon type="&#xe6a2;" /></Button></Row>
                            <Row style={ styles.moreIconWrap }><Button vertical transparent><Icon type="&#xe613;" /></Button></Row>
                        </Col>
                    </Grid>
                    <Grid
                        style={styles.marketInfoContainer}>
                        <Thumbnail
                            large
                            square
                            style={styles.marketImage}
                            source={{ uri: "https://unsplash.it/g/200/300" }}>
                        </Thumbnail>
                        <View>
                            <View style={ styles.marketNameWrap }>
                                <Text>
                                    { item.shop_name }
                                </Text>
                            </View>
                            <Text style={styles.marketArea}>
                                { item.category }
                            </Text>
                            <Text style={styles.marketArea}>
                                { item.area }
                            </Text>
                        </View>
                        <Button bordered
                                style={ styles.toMarketButton }
                                onPress={ () => this.openShopPage(item.shop_id) }
                        >
                            <Text style={styles.toMarketButtonText}>
                                进店逛逛
                            </Text>
                        </Button>
                    </Grid>
                    <Tabs>
                        <Tab heading="图文详情">
                            { banner.map(this.createSwiperList) }
                        </Tab>
                        <Tab heading="宝贝参数">
                            <Grid>
                                <Row>
                                    <Col size={1}><Text>风格</Text></Col>
                                    <Col size={3}><Text>街头</Text></Col>
                                </Row>
                            </Grid>
                        </Tab>
                    </Tabs>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical>
                            <Icon type="&#xe637;" />
                            <Text style={ styles.footerButtonText }>联系</Text>
                        </Button>
                        <Button vertical
                            onPress = { () => this.openShopPage(item.shop_id) }>
                            <Icon type="&#xe609;" />
                            <Text style={ styles.footerButtonText }>店铺</Text>
                        </Button>
                        { this.createFav(item.fav) }
                    </FooterTab>
                    <FooterTab>
                        <Button style={ styles.addToOrder }>
                            <Text style={{ ...styles.footerButtonText, color: "#fff"} }>加入采购单</Text>
                        </Button>
                        <Button style={ styles.sendToTaobao }>
                            <Text style={{ ...styles.footerButtonText, color: "#fff"} }>传淘宝</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
    createFav = (fav: boolean) => {
        if (fav) {
            return (
                <Button
                    vertical
                    onPress={ this.setFav }
                >
                    <Icon type="&#xe64a;" />
                    <Text style={ styles.footerButtonText }>关注</Text>
                </Button>
            );
        }
        else {
            return (
                <Button
                    vertical
                    onPress={ this.setFav }
                >
                    <Icon type="&#xe71e;" />
                    <Text style={ styles.footerButtonText }>关注</Text>
                </Button>
            );
        }
    }
    renderSwiper(banner: string[]) {
        if (this.state.showSwiper) {
            return(
                <Swiper
                        showsButtons={false}
                        autoplay={true}
                        autoplayTimeout={4}
                        height={400}
                        showsPagination={true}
                        dotColor={"#fff"}>
                        { banner.map(this.createSwiperList) }
                    </Swiper>
            );
        } else {
            return <View style={{height: 400}}></View>;
        }
    }
    createSwiperList = (image: string, index: number, list: any[]) => (
        <TouchableOpacity
            key={ index }
            onPress={() => this.showLargeImage(list, index)}>
            <ImageExtra
            style={ styles.swiperImage }
            source={{ uri: image }}
            />
        </TouchableOpacity>
    )
    openShopPage = (id: string) => {
        Navigator.to(Routes.ROUTES_SHOP, { id });
    }
    showLargeImage = (list: any[], index: number) => {
        let imageUrls = list.map( (url: string, index: number) => {
            return {url};
        });
        ImageViewer.show({
            imageUrls,
            index
        });
    }
    setFav = async () => {
        const id: string = this.props.navigation.state.params.id;
        const item: any = Store.get(`goods.goods.${id}`);
        if (!id) return;
        let value: boolean = !!item.fav;
        try {
            let res: any;
            if (value) {
                res = await APIs.goods.postGoodsFavRemove({ u_id: id });
            }
            else {
                res = await APIs.goods.postGoodsFavAdd({ u_id: id });
            }
            let newItem: any = Lodash.assign({}, item, {
                fav: !value
            });
            Store.dispatch({
                type: Constants.ACTIONTYPES_GOODS_UPDATE,
                meta: {
                    storeKey: `goods.${id}`,
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
            const res: any = await APIs.goods.getGoodsInfo({ id: id });
            Store.dispatch({
                type: Constants.ACTIONTYPES_GOODS_UPDATE,
                meta: {
                    storeKey: `goods.${id}`,
                },
                payload: res.data
            });
        }
        catch (e) {

        }
    }

    fetchImages = async () => {
        const id: string = this.props.navigation.state.params.id;
        try {
            const res: any = await APIs.goods.getGoodsImages({ u_id: id });
            Store.dispatch({
                type: Constants.ACTIONTYPES_GOODS_UPDATE,
                meta: {
                    storeKey: `goods.${id}.image`,
                },
                payload: res.data.results
            });
        }
        catch (e) {

        }
    }

}

