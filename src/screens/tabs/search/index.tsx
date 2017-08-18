import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableOpacity
} from "react-native";
import {
    Header,
    Icon,
    Item,
    Input,
    ListItem,
    Thumbnail
} from "native-base";
import RefreshList, { RefreshState } from "../../../components/refresh-list";
import ScrollToTop from "../../../components/scroll-to-top";
import SearchBar from "../../../components/search-bar";
import { Constants, Widgets, Store, Navigator, APIs, Decorators, Routes } from "summer";
import { styles } from "./style";
import { connect } from "react-redux";

let { TabBarIcon } = Widgets;

@Decorators.connect("user", "search", "data.city.currentCity")
export default class SearchScreen extends React.Component<any, any> {
    private flatList: any;
    private scrollToTopButtom: any;
    static navigationOptions = {
        title: "ROUTES_SEARCH",
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
            isShowSide: true, /**切换列表布局*/
            blockIndex: 0,
            loading: false
        };
    }

    componentDidMount() {
        this.flatList.startHeaderRefreshing();
    }
    private renderRow = (rowData: any) => {
        let item = rowData.item;
        return (
            <TouchableOpacity
                onPress={ () => this.openGoodsPage(item.goods_id) }>
                <View style={this.state.isShowSide ? styles.listItemSide : styles.listItem}>
                    <Thumbnail
                        square
                        style={styles.goodsPic}
                        source={{ uri: "https://unsplash.it/200/300/?blur" }}
                    />
                    <View style={styles.goodsDetail}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.redFont}>￥{item.price}</Text>
                        <Text style={styles.share}>...</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const data: any = Store.get("search.list") || [];
        return (
            <View style={ styles.container }>
                <SearchBar
                    placeholder="搜索当季爆款"
                    rightButton={
                        <Text style={styles.headerRightButton} onPress={this.openClassification}>分类</Text>
                    }/>
                <RefreshList
                    key={this.state.isShowSide ? 1 : 2}
                    ref={ (e) => this.flatList = e }
                    data={ data }
                    renderItem={ this.renderRow }
                    onHeaderRefresh={ () => this.fetchList(true) }
                    onFooterRefresh={ () => this.fetchList(false) }
                    numColumns={this.state.isShowSide ? 2 : 1}
                    onScrollTop={this.flatListScrollTop}
                />
                <ScrollToTop ref={ (e) => this.scrollToTopButtom = e } bindRef={ this.flatList }/>
            </View>
        );
    }
    flatListScrollTop = (scrollTop: boolean) => {
        scrollTop ? this.scrollToTopButtom.hideButton() : this.scrollToTopButtom.showButton();
    }

    openGoodsPage = (id: string) => {
        Navigator.to(Routes.ROUTES_GOODS, { id });
    }
    openClassification = () => {

    }
    fetchList = async (isRefresh?: boolean) => {
        let blockIndex = isRefresh ? 0 : this.state.blockIndex + 1;
        this.state.loading = false;
        this.setState(this.state);
        try {
            const res: any = await APIs.search.getSearchGoodsList({
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
            let list: any = Store.get("search.list") || [];
            let newList: any = [];
            if (isRefresh) {
                newList = res.data.results;
            }
            else {
                newList = [...list, ...res.data.results];
            }
            Store.dispatch({
                type: Constants.ACTIONTYPES_SEARCH_UPDATE,
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
}