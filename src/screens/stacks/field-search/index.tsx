import * as React from "react";
import { Store, Constants, APIs, Widgets, Decorators, Navigator, Routes } from "summer";
import { TouchableOpacity, View } from "react-native";
import {
    Text,
    Container,
    Header,
    Content,
    List,
    ListItem,
    Item,
    Input,
    Button,
    Icon as BaseIcon
} from "native-base";
import { styles } from "./style";
const { Icon } = Widgets;

@Decorators.connect("user", "search")
export default class FiledSearchScreen extends React.Component {
    static navigationOptions = {
        header:
            <Header searchBar rounded>
                <Button transparent
                    onPress={
                        Navigator.back
                    }>
                    <Icon type="&#xea53;"/>
                </Button>
                <Item>
                    <BaseIcon name="search"/>
                    <Input
                        placeholder="请输入店铺名/档口号/旺旺号"/>
                </Item>
            </Header>
    };
    constructor(props: any) {
        super(props);
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
                    onPress={() => alert(i)}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            </ListItem>

    )
    renderFooter = () => {

    }
    render() {
        let data: any[] = ["男装", "女装", "连衣裙"];
        const hotSearchList: any[] = Store.get("data.search.hotSearchList") || [];
        return (
            <Container>
                <View style={ styles.hotSearch }>
                    <View style={ styles.hotSearchTitle }>
                        <Text><Icon type="&#xe729;"/>热门搜索</Text>
                    </View>
                    <View style={ styles.hotSearchList }>
                        {hotSearchList.map(this.createHotList)}
                    </View>
                </View>
                <View>
                    <Text><Icon type="&#xe620;"/>历史搜索</Text>
                </View>
                <Content>
                    <List
                        dataArray={ data }
                        renderRow={this.renderHistorySearchRow}
                    />
                </Content>
            </Container>
        );
    }
    search = (filed: string) => {
        Store.update("data.search.searchField", filed);
        Navigator.to(Routes.ROUTES_FIELD_SEARCH);
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