import * as React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
    FlatList,
    View,
    RefreshControl
} from "react-native";
import RefreshList, { RefreshState } from "../../../components/refresh-list";
import ScrollToTop from "../../../components/scroll-to-top";
import { APIs, Widgets, AppStore, Constants } from "summer";
let { TabBarIcon } = Widgets;
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

class MarketScreen extends React.Component<any, any> {
    private flatList: any;
    private listView: any;
    static navigationOptions = {
        title: Constants.ROUTES_MARKET,
        tabBarLabel: "逛市场",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe61e;"
                color={options.tintColor}
                size="md"
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
        this.fetchList(true);
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
        const data: any = AppStore.get("market.list") || [];
        return (
            <View style={styles.view}>
                <ListHeader/>
                <RefreshList
                    ref={ (e) => this.listView = e }
                    data={ data }
                    renderItem={ this.renderRow }
                    onHeaderRefresh={ () => this.fetchList(true) }
                    onFooterRefresh={ () => this.fetchList(false) }
                />
                <ScrollToTop bindRef={ this.listView }/>
            </View>
        );
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
                return;
            }
            let list: any = AppStore.get("market.list") || [];
            let newList: any = [];
            if (isRefresh) {
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
            this.setState({
                loading: false,
                blockIndex: blockIndex
            });
            let footerState = RefreshState.Idle;
            /** 测试已加载全部数据 */
            if (newList.length > 50) {
                footerState = RefreshState.NoMoreData;
            }
            this.listView.endRefreshing(footerState);
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

const mapStateToProps = (state: any) => ({
    data: state.get("market").toJS(),
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(MarketScreen);

