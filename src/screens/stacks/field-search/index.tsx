import * as React from "react";
import { Store, Constants, APIs, Widgets, Decorators, Navigator, Routes } from "summer";
import { TouchableOpacity, View, TextInput, TouchableHighlight } from "react-native";
import {
    Text,
    Container,
    Content,
    List,
    ListItem,
    Button,
    Icon as BaseIcon
} from "native-base";
import { styles } from "./style";
import {underline} from "chalk";
const { Icon, Header } = Widgets;

@Decorators.connect("search", "data.searchFiled", "market")
export default class FiledSearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any
    };
    constructor(props: any, context: any) {
        super(props);
        this.state = {
            filed: "",
            selectedOption: this.props.navigation.state.params.origin === "Market" ? "档口名" : "宝贝",
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
        const { selectedOption } = this.state;
        switch (this.props.navigation.state.params.origin) {
           case Routes.ROUTES_TAB_HOME:
                select = (
                    <View style={styles.searchSelect}>
                        <TouchableOpacity
                            onPress={this.selectOptionToggle}>
                            <View style={styles.selectBotton}>
                                <Text>{this.state.selectedOption}</Text>
                                <Icon type="&#xe61a;"/>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.showSelectOptions ?
                                <View style={styles.searchOptions}>
                                    <Button style={selectedOption === "宝贝" ? styles.selectedOption : {}} onPress={() => this.select("宝贝")} dark><Text>宝贝</Text></Button>
                                    <Button style={selectedOption === "店铺" ? styles.selectedOption : {}} onPress={() => this.select("店铺")} dark><Text>店铺</Text></Button>
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
                                <Text>{this.state.selectedOption}</Text>
                                <Icon type="&#xe61a;"/>
                            </View>
                        </TouchableOpacity>
                        {
                            this.state.showSelectOptions ?
                                <View style={styles.searchOptions}>
                                    <Button style={selectedOption === "档口名" ? styles.selectedOption : {}} onPress={() => this.select("档口名")} dark><Text>档口名</Text></Button>
                                    <Button style={selectedOption === "档口号" ? styles.selectedOption : {}} onPress={() => this.select("档口号")} dark><Text>档口号</Text></Button>
                                    <Button style={selectedOption === "旺旺号" ? styles.selectedOption : {}} onPress={() => this.select("旺旺号")} dark><Text>旺旺号</Text></Button>
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
                <Header>
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
                    <TouchableOpacity
                        onPress={ () => this.search(this.state.filed) }>
                        <View style={styles.searchButton}>
                            <Text style={styles.searchButtonText}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </Header>
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
    select = (selectedOption: string) => {
        this.setState({
            selectedOption
        });
        this.selectOptionToggle();
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
        Store.update("data.searchFiled.historyList", []);
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
        const historyList: string[] = Store.get("data.searchFiled.historyList") || [];
        Store.update("data.searchField.historyList", [ ...new Set(historyList.concat([filed])) ]);
        if (this.props.navigation.state.params.origin === Routes.ROUTES_TAB_MARKET
            || this.state.selectedOption === "店铺") {
            Store.update("market.filterInfo.field", filed);
            Navigator.backToTab("Market");
        }
        else {
            Store.update("search.filterInfo.field", filed);
            Navigator.backToTab("Search");
        }
    }
    getHotSearchList = async () => {
        try {
            const res: any = await APIs.data.getHotSearchList();
            const hotSearchList: any = res.data;
            Store.update("data.searchFiled.hotSearchList", hotSearchList);
        }
        catch (e) {

        }
    }
}