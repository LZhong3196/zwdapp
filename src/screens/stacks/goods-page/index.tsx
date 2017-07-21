import * as React from "react";
import * as Lodash from "lodash";
import { AppStore, AppNavigator, Constants, APIs, Widgets } from "summer";
import {
    Image,
    View,
    Slider
} from "react-native";
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
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";

import { styles } from "./style";

let { Icon } = Widgets;

interface CarouselProps {
    images: any;
}


export default class GoodsPageScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerBackTitle: "",
        headerStyle: styles.header
    };

    componentWillMount() {
        this.fetchData();
    }

    componentWillReceiveProps(nextProps: any) {

    }

    componentWillUnmount() {
    }

    render() {
        const id: string = this.props.navigation.state.params.id;
        const item: any = AppStore.get(`goods.goods.${id}`) || {};

        const cover: string = !!item.banner ? item.banner[0] : undefined;
        return (
            <Container>
                <Content style={styles.container}>
                    <Card style={styles.bannerContainer}>
                        <CardItem cardBody>
                            {!cover ? null : <Image source={{ uri: cover }} />}
                        </CardItem>
                        <CardItem cardBody>
                            <Text>{item.title}</Text>
                        </CardItem>
                    </Card>

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
        const item: any = AppStore.get(`goods.goods.${id}`);
        if (!id) return;
        let value: boolean = !!item.fav;
        try {
            let res: any;
            if (value) {
                res = await APIs.goods.postGoodsFavRemove({ u_id: id });
            }
            else {
                res = await APIs.market.postShopFavAdd({ u_id: id });
            }
            let newItem: any = Lodash.assign({}, item, {
                fav: !value
            });
            AppStore.dispatch({
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
            AppStore.dispatch({
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
            AppStore.dispatch({
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

