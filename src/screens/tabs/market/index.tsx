import * as React from "react";
import { NavigationActions } from "react-navigation";
import {
    FlatList,
    View,
    RefreshControl,
    StatusBar
} from "react-native";
import { APIs, Widgets, AppStore, Constants, Decorators } from "summer";
import {
    ListItem,
    Thumbnail,
    Text,
    Body,
    Input,
    Item,
    Left,
    Header,
    Fab,
} from "native-base";

let { TabBarIcon, Icon } = Widgets;

import { styles } from "./style";

type EndReachedInfo = {
    distanceFromEnd: number
};


class ListHeader extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        return (
            <Header>
                <Left>

                </Left>
                <Body>
                    <Input placeholder="请输入店铺名/档口号/旺旺号" />
                </Body>
            </Header>
        )
    }
}

@Decorators.connect("user", "market")
export default class MarketScreen extends React.Component<any, any> {
    private flatList: any;

    static navigationOptions = {
        title: Constants.ROUTES_MARKET,
        tabBarLabel: "逛市场",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe61e;"
                activeType="&#xe605;"
                focused={options.focused} />
        )
    };
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            blockIndex: 0,
            list: undefined,
            loading: false
        };
    }

    componentWillMount() {
        this.fetchList();
    }

    render() {
        const data: any = AppStore.get("market.list") || [];
        const refreshControl = (
            <RefreshControl
                title="下拉刷新"
                refreshing={this.state.loading}
                onRefresh={this.onRefresh} />
        );
        return (
            <View style={styles.view}>
                <StatusBar />
                <FlatList
                    ref={(component: any) => this.flatList = component}
                    data={data}
                    ListHeaderComponent={ListHeader}
                    getItemLayout={(data: any, index: number) => ({
                        length: 134,
                        offset: 134 * index,
                        index
                    })}
                    keyExtractor={(item: any, index: number) => `${index}_${item.u_id}`}
                    refreshControl={refreshControl}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={0.05}
                    renderItem={(info: any) => {
                        const item: any = info.item;
                        return (
                            <ListItem
                                style={styles.container}
                                onPress={() => this.openShopPage(item.u_id)}>
                                <Thumbnail
                                    large
                                    square
                                    style={styles.itemImage}
                                    source={{ uri: item.image }}>
                                </Thumbnail>
                                <Body>
                                    <Text style={styles.itemTitle}>
                                        {item.title}
                                    </Text>
                                    <Text style={styles.itemIntro}>
                                        {item.main}
                                    </Text>
                                    <Text style={styles.itemIntro}>
                                        {item.price}
                                    </Text>
                                    <Text style={styles.itemIntro}>
                                        {item.service}
                                    </Text>
                                </Body>
                            </ListItem>
                        );
                    }} />
                <Fab
                    position="bottomRight"
                    style={styles.scrollToTop}
                    onPress={this.scrollToTop}>
                    <Icon type="&#xe60d;" color="#F85E3B" />
                </Fab>
            </View>
        );
    }

    setStatusBar = () => {
        StatusBar.setBarStyle("light-content");
    }

    scrollToTop = () => {
        this.flatList.scrollToOffset({ y: 0 });
    }

    openShopPage = (id: string) => {
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

    fetchList = async () => {
        this.state.loading = true;
        this.setState(this.state);
        try {
            const res: any = await APIs.market.getShopList({
                block_info: {
                    index: this.state.blockIndex
                }
            });
            if (!res.data.results.length) {
                /** no more data */
                return;
            }
            let list: any = AppStore.get("market.list") || [];
            let newList: any = [];
            if (!this.state.blockIndex) {
                newList = res.data.results;
            }
            else {
                newList = [...list, ...res.data.results];
            }
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_MARKET_UPDATE,
                meta: {
                    storeKey: "list",
                },
                payload: newList
            });
            this.state.loading = false;
            this.setState(this.state);
        }
        catch (e) {

        }
    }


    onRefresh = () => {
        if (this.state.loading) {
            return;
        }
        this.state.blockIndex = 0;
        this.setState(this.state);
        this.fetchList();
    }

    onEndReached = (info: EndReachedInfo) => {
        if (this.state.loading || this.state.blockIndex > 6) {
            return;
        }
        this.state.blockIndex++;
        this.setState(this.state);
        this.fetchList();
    }

}



