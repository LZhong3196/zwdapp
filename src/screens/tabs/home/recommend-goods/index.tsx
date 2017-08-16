import * as React from "react";
import {
    ScrollView,
    TouchableOpacity,
    View,
    Text
} from "react-native";
import { styles } from "../style";
import { Store, Navigator, Constants, Widgets, Decorators, Routes } from "summer";
const { ImageExtra } = Widgets;

@Decorators.connect("home")
@Decorators.pureRender()
export default class RecommendGoods extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    createRecommendGoodsList = (item: any, index: number) => (
        <TouchableOpacity
            key={ index }
            onPress={ () => this.openGoodsPage(item.goods_id) }
        >
            <ImageExtra qualityControl="XL"
                        style={ styles.RecommendGoodsListImage }
                        source={{ uri: item.image }}
            />
        </TouchableOpacity>
    )
    render() {
        const initAdevert = { header: { image: "https://unsplash.it/g/200/300", shop_id: "0" }, list: [] as any[] };
        const advertList: any = Store.get("home.advert") || {};
        const { A2 = initAdevert } = advertList;
        return (
            <View>
                <View style={ styles.title }>
                    <View style={ styles.titleLine }></View>
                    <Text> 推荐宝贝</Text>
                    <View style={ styles.titleLine }></View>
                </View>
                <TouchableOpacity
                    onPress={ () => this.openShopPage(A2.header.shop_id) }
                >
                    <ImageExtra qualityControl="XL"
                                style={ styles.headerImage }
                                source={{ uri: A2.header.image }}
                    />
                </TouchableOpacity>
                <ScrollView
                    style={ styles.RecommendGoodsListScroll }
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    { A2.list.map(this.createRecommendGoodsList) }
                </ScrollView>
            </View>
        );
    }
    openShopPage = (id: string) => {
        if (!id) return;
        Navigator.to(Routes.ROUTES_SHOP, { id });
    }
    openGoodsPage = (id: string) => {
        if (!id) return;
        Navigator.to(Routes.ROUTES_GOODS, { id });
    }
}