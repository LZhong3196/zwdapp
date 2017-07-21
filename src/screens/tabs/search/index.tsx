import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image
} from "react-native";
import {
    Header,
    Icon,
    Item,
    Input
} from "native-base";
import RefreshList, { RefreshState } from "../../../components/refresh-list";
import ScrollToTop from "../../../components/scroll-to-top";
import { Constants, Widgets, AppStore, APIs } from "summer";
import { styles } from "./style";
import { connect } from "react-redux";

let { TabBarIcon } = Widgets;

class SearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        title: Constants.ROUTES_SEARCH,
        tabBarLabel: "搜款式",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe620;"
                activeType="&#xe608;"
                size={options.focused ? "lg" : "md"}
                focused={options.focused} />
        ),
      
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            isShowSide: true,
            blockIndex: 0,
            loading: false
        };
    }

    componentDidMount() {
        this.listView.startHeaderRefreshing();
    }

    render() {
        const data: any = AppStore.get("market.list") || [];
        return (
            <View style={ styles.container }>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="search"/>
                        <Input placeholder="请输入店铺名/档口号/旺旺号" />
                        <Icon name="md-expand"></Icon>
                    </Item>
                </Header>
                <RefreshList
                    key={this.state.isShowSide ? 1 : 2}
                    ref={ (e) => this.listView = e }
                    data={ data }
                    renderItem={ this.renderRow }
                    onHeaderRefresh={ () => this.fetchList(true) }
                    onFooterRefresh={ () => this.fetchList(false) }
                    numColumns={this.state.isShowSide ? 2 : 1}
                />
                <ScrollToTop bindRef={ this.listView }/>
            </View>
        );
    }
    private renderRow = (rowData: any) => {
        let item = rowData.item;
        return (
            <View style={this.state.isShowSide ? styles.listItemSide : styles.listItem}>
                <Image
                    style={styles.goodsPic}
                    source={{ uri: "https://unsplash.it/200/300/?blur" }}
                />
                <View style={styles.goodsDetail}>
                    <Text style={styles.title}>{item.description}</Text>
                    <Text style={styles.redFont}>￥{item.price}</Text>
                    <Text style={styles.share}>...</Text>
                </View>
            </View>
        );
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
}

const mapStateToProps = (state: any) => ({
    data: state.get("market").toJS(),
    user: state.get("user").toJS()
});

export default connect(mapStateToProps)(SearchScreen);