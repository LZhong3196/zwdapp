import * as React from "react";
import {
    TouchableOpacity,
    View,
    Text
} from "react-native";
import { styles } from "../style";
import { Store, Navigator, Constants, Widgets, Decorators, Routes } from "summer";
const { ImageExtra } = Widgets;

@Decorators.connect("home")
export default class RecommendGoods extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }
    createAdvertList = (item: any, index: number) => {
        const createList = (item: any, index: number) => {
            return (
                <TouchableOpacity
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
                </TouchableOpacity>
            );
        };
        return (
            <View style={styles.advertItem} key={ index }>
                <TouchableOpacity
                    onPress={ () => this.openShopPage(item.header.shop_id) }
                >
                    <ImageExtra qualityControl="XL"
                                style={ styles.headerImage }
                                source={{ uri: item.header.image }}
                    />
                </TouchableOpacity>
                <View style={ styles.advertListContainer }>
                    { item.list.map(createList) }
                </View>
            </View>
        );
    }
    render() {
        const advertList: any = Store.get("home.advert") || {};
        const { A5 = [] as any[] } = advertList;
        return (
            <View>
                { A5.map(this.createAdvertList) }
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