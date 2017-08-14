import * as React from "react";
import { Store, Constants, APIs, Widgets, Decorators, Navigator, Routes } from "summer";
import { TouchableOpacity, View, TextInput } from "react-native";
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
const { Icon } = Widgets;

@Decorators.connect("user", "search", "data")
export default class FiledSearchScreen extends React.Component<any, any> {
    static navigationOptions = {
        header: null as any
    };
    constructor(props: any, context: any) {
        super(props);
        this.state = {
            filed: ""
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
            <TouchableOpacity
               onPress={this.clearHistorySearch}>
                <View style={styles.clearSearchHistory}>
                    <Text>清除历史记录</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        const data: any[] = Store.get("data.search.historyList") || [];
        /**历史搜索应该添加入持久化名单*/
        const hotSearchList: any[] = Store.get("data.search.hotSearchList") || [];
        return (
            <Container>
                <Header style={styles.header}>
                    <TouchableOpacity
                        onPress={Navigator.back}>
                        <Icon type="&#xea53;"/>
                    </TouchableOpacity>
                    <View style={ styles.inputWrap }>
                        <View style={styles.searchSelect}>
                            <Text>宝贝</Text>
                            <Icon type="&#xe61a;"/>
                        </View>
                        <TextInput
                            value={this.state.filed}
                            style={ styles.input }
                            underlineColorAndroid="transparent"
                            onChangeText={this.textChange}/>
                    </View>
                    <Button style={styles.searchButton}
                            onPress={ () => this.search(this.state.filed) }>
                        <Text>搜索</Text>
                    </Button>
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
    search = (filed: string) => {
        if (!filed) return;
        Store.update("data.search.searchField", filed);
        const historyList: string[] = Store.get("data.search.historyList") || [];
        Store.update("data.search.historyList", [ ...new Set(historyList.concat([filed])) ]);
        Navigator.backToTab(Routes.ROUTES_TAB_SEARCH);
        /**TODO 从stack页跳转到具体tab页路由实现*/
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