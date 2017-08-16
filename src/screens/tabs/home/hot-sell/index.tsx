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
    createHotSellList = (item: any, index: number) => (
        <TouchableOpacity
            key={ index }
            onPress={ () => this.openGoodsPage(item.goods_id) }
        >
            <ImageExtra qualityControl="XL"
                        style={ styles.hotSellListImage }
                        source={{ uri: item.image }}
            />
        </TouchableOpacity>
    )
    render() {
        const initAdevert = { header: { image: "https://unsplash.it/g/200/300", shop_id: "0" }, list: [] as any[] };
        const advertList: any = Store.get("home.advert") || {};
        const { A3 = initAdevert } = advertList;
        return (
            <View>
                <View style={ styles.title }>
                    <View style={ styles.titleLine }></View>
                    <Text> 精品热卖</Text>
                    <View style={ styles.titleLine }></View>
                </View>
                <TouchableOpacity
                    onPress={ () => this.openShopPage(A3.header.shop_id) }
                >
                    <ImageExtra qualityControl="XL"
                                style={ styles.headerImage }
                                source={{ uri: A3.header.image }}
                    />
                </TouchableOpacity>
                <View style={ styles.hotSellListWrap }>
                    { A3.list.map(this.createHotSellList) }
                </View>
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