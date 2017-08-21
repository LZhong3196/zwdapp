import * as React from "react";
import {
    ScrollView,
    TouchableOpacity,
    Image,
    View
} from "react-native";
import { styles } from "../style";
import { Store, Navigator, Constants, Widgets, Decorators, Routes } from "summer";
import Swiper from "react-native-swiper";
const { ImageExtra } = Widgets;

@Decorators.connect("home")
export default class HomeSwiper extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            showSwiper: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                showSwiper: true
            });
        }, 0);
    }

    renderSwiper = () => {
        const advertList: any = Store.get("home.advert") || {};
        const { A1 = [] as any[]} = advertList;

        if (this.state.showSwiper) {
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
            );
        }
    }

    createSwiperList = (item: any, index: number): any => (
        <TouchableOpacity
            key={ index }
            onPress={ () => this.openShopPage(item.shop_id) }
        >
            <ImageExtra qualityControl="XL"
                        style={ styles.swiperItem }
                        source={{ uri: item.image }}
            />
        </TouchableOpacity>
    )
    render() {
        return (
            <View style={{height: 150}}>
                { this.renderSwiper() }
            </View>
        );
    }
    openShopPage = (id: string) => {
        if (!id) return;
        Navigator.to(Routes.ROUTES_SHOP, { id });
    }
    navTo = (target: string) => {
        Navigator.to(target);
    }
}