import * as React from "react";
import { NavigationActions } from "react-navigation";
import {
    FlatList,
    View,
    RefreshControl,
    StatusBar
} from "react-native";
import { APIs, Widgets, Store, Navigator, Constants, Decorators, Routes } from "summer";
import RefreshList, { RefreshState } from "../../../components/refresh-list";
import ScrollToTop from "../../../components/scroll-to-top";
let { TabBarIcon, ImageExtra } = Widgets;
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
    Icon
} from "native-base";



import { styles } from "./style";

type EndReachedInfo = {
    distanceFromEnd: number
};

class ListHeader extends React.PureComponent<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {

        };
    }

    render() {
        return (
            <Header searchBar rounded>
                <Item>
                    <Icon name="search"/>
                    <Input placeholder="请输入店铺名/档口号/旺旺号" />
                    <Icon name="md-expand"></Icon>
                </Item>
            </Header>
        );
    }
}

@Decorators.connect("user", "market")
export default class MarketScreen extends React.Component<any, any> {
    private flatList: any;
    static navigationOptions = {
        title: "Routes.ROUTES_MARKET",
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

    componentDidMount() {
        this.flatList.startHeaderRefreshing();
    }

    private renderRow= (info: any) => {
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
    }

    render() {
        const data: any = Store.get("market.list") || [];
        return (
            <View style={styles.view}>
                <ListHeader/>
                <RefreshList
                    ref={ (e) => this.flatList = e }
                    data={ data }
                    renderItem={ this.renderRow }
                    onHeaderRefresh={ () => this.fetchList(true) }
                    onFooterRefresh={ () => this.fetchList(false) }
                />
                <ScrollToTop bindRef={ this.flatList }/>
            </View>
        );
    }
    openShopPage = (id: string) => {
        Navigator.to(Routes.ROUTES_SHOP, { id });
    }

    fetchList = async (isRefresh?: boolean) => {
        let blockIndex = isRefresh ? 0 : this.state.blockIndex + 1;
        this.state.loading = false;
        this.setState(this.state);
        try {
            const res: any = await APIs.market.getShopList({
                block_info: {
                    index: blockIndex
                }
            });
            if (!res.data.results.length) {
                /** no more data */
                let footerState = RefreshState.NoMoreData;
                this.flatList.endRefreshing(footerState);
                return;
            }
            let list: any = Store.get("market.list") || [];
            let newList: any = [];
            if (isRefresh) {
                newList = res.data.results;
            }
            else {
                newList = [...list, ...res.data.results];
            }
            Store.dispatch({
                type: Constants.ACTIONTYPES_MARKET_UPDATE,
                meta: {
                    storeKey: "list",
                },
                payload: newList
            });
            this.setState({
                loading: false,
                blockIndex: blockIndex
            });
            let footerState = RefreshState.Idle;
            this.flatList.endRefreshing(footerState);
        }
        catch (e) {

        }
    }

    onRefresh = () => {
        if (this.state.loading) {
            return;
        }
        this.fetchList(true);
    }

    onEndReached = (info: EndReachedInfo) => {
        if (this.state.loading || this.state.blockIndex > 6) {
            return;
        }
        this.fetchList(false);
    }

}


