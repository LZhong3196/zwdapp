import * as React from "react";
import { Store, Constants, APIs, Widgets, Decorators, Navigator, Routes } from "summer";
import { TouchableOpacity, View, TextInput, TouchableHighlight } from "react-native";
import {
    Text,
    Container,
    Header,
    Content,
    List,
    ListItem,
    Button,
    Icon as BaseIcon
} from "native-base";
import { styles } from "./style";
import {underline} from "chalk";
const { Icon } = Widgets;

@Decorators.connect("search", "data")
export default class FiledSearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any
    };
    constructor(props: any, context: any) {
        super(props);
        this.state = {
            filed: "",
            showSelectOptions: false
        };
    }
    componentDidMount() {
        this.getHotSearchList();
    }
    createHotList = (item: any, index: number) => (
        <Button key={index} bordered style={ styles.hotSearchItem }
            onPress={() => this.search(item)}><Text>{item}</Text></Button>
    )
    renderHistorySearchRow = (item: string, i: number) => (
            <ListItem
                key={i}>
                <TouchableOpacity
                    onPress={() => this.historyFiledPress(item)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            </ListItem>
    )
    renderFooter = () => {
        return (
            <Button full light
                onPress={this.clearHistorySearch}>
                    <Text>清除历史记录</Text>
            </Button>
        );
    }
    renderSelect = () => {
        let select = undefined;
        switch (this.props.navigation.state.params.origin) {
           case Routes.ROUTES_TAB_HOME:
                select = (
                    <View style={styles.searchSelect}>
                        <TouchableOpacity
                            onPress={this.selectOptionToggle}>
                            <View style={styles.selectBotton}>
                                <Text>宝贝</Text>
                                <Icon type="&#xe61a;"/>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.showSelectOptions ?
                                <View style={styles.searchOptions}>
                                    <Button dark><Text>宝贝</Text></Button>
                                    <Button dark><Text>店铺</Text></Button>
                                </View>
                                : undefined
                        }

                    </View>
                );
                break;
            case Routes.ROUTES_TAB_MARKET:
                select = (
                    <View style={styles.searchSelect}>
                        <TouchableOpacity
                            onPress={this.selectOptionToggle}>
                            <View style={styles.selectBotton}>
                                <Text>档口名</Text>
                                <Icon type="&#xe61a;"/>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.showSelectOptions ?
                                <View style={styles.searchOptions}>
                                    <Button dark><Text>档口名</Text></Button>
                                    <Button dark><Text>档口号</Text></Button>
                                    <Button dark><Text>旺旺号</Text></Button>
                                </View>
                                : undefined
                        }
                    </View>
                );
                break;
        }
        return select;
    }
    render() {
        const data: any[] = Store.get("data.search.historyList") || [];
        const hotSearchList: any[] = Store.get("data.search.hotSearchList") || [];
        return (
            <Container>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={this.goback}>
                        <Icon type="&#xea53;"/>
                    </TouchableOpacity>
                    <View style={ styles.inputWrap }>
                        { this.renderSelect() }
                        <TextInput
                            placeholder={"请输入宝贝关键词"}
                            value={this.state.filed}
                            style={ styles.input }
                            underlineColorAndroid="transparent"
                            autoFocus={true}
                            onChangeText={this.textChange}/>
                    </View>
                    <Button style={styles.searchButton}
                            onPress={ () => this.search(this.state.filed) }>
                        <Text>搜索</Text>
                    </Button>
                </View>
                <View style={ styles.hotSearch }>
                    <View style={ styles.hotSearchTitle }>
                        <Text><Icon type="&#xe729;" style={styles.titleIcon}/>热门搜索</Text>
                    </View>
                    <View style={ styles.hotSearchList }>
                        {hotSearchList.map(this.createHotList)}
                    </View>
                </View>
                <View>
                    <Text><Icon type="&#xe620;" style={styles.titleIcon}/>历史搜索</Text>
                </View>
                <Content>
                    <List
                        dataArray={ data }
                        renderRow={this.renderHistorySearchRow}
                        renderFooter={this.renderFooter}
                    />
                </Content>
            </Container>
        );
    }
    selectOptionToggle = () => {
        this.setState({
            showSelectOptions: !this.state.showSelectOptions
        });
    }
    textChange = (text: string) => {
        this.setState({
           filed: text
        });
    }
    clearHistorySearch = () => {
        Store.update("data.search.historyList", []);
    }
    historyFiledPress= (filed: string) => {
        this.setState({
            filed
        });
    }
    goback = () => {
        Navigator.back();
    }
    search = (filed: string) => {
        if (!filed) return;
        switch (this.props.navigation.state.params.origin) {
            case Routes.ROUTES_TAB_HOME:

                break;
                case Routes.ROUTES_TAB_MARKET:

                break;
                case Routes.ROUTES_TAB_SEARCH:
                    Store.update("data.search.searchField", filed);
                    const historyList: string[] = Store.get("data.search.historyList") || [];
                    Store.update("data.search.historyList", [ ...new Set(historyList.concat([filed])) ]);
                    Navigator.backToTab("Search");
                break;
        }
    }
    getHotSearchList = async () => {
        try {
            const res: any = await APIs.data.getHotSearchList();
            const hotSearchList: any = res.data;
            Store.update("data.search.hotSearchList", hotSearchList);
        }
        catch (e) {

        }
    }
}