
import React, { PureComponent } from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableHighlight
} from "react-native";
import {connect} from "react-redux";
import { Constants, Widgets, Navigator, Decorators, Store, APIs, Routes } from "summer";
const { ImageExtra } = Widgets;
import { styles } from "./style";

export default class Classification extends PureComponent<any, any> {
    static navigationOptions = {
        title: "类目",
    };
    constructor(props: any, context: any) {
        super(props);
        this.state = {
            currentClassificationIndex: 0,
            currentClassificationList: [],
            classificationData: []
        };
    }

    componentDidMount() {
        this.fetchList();
    }
    createList = (item: any, i: number) => (
        <TouchableHighlight onPress={ () => this.onItemPress(item.name) } key={ i }>
            <View style={ styles.detailItem }>
                <ImageExtra style={ styles.detailImage } source={{uri: item.url}}/>
                <Text>
                    { item.name }
                </Text>
            </View>
        </TouchableHighlight>
    )

    createTab = (item: any, i: number) => (
        <TouchableHighlight onPress={ () => this.onTabPress(i) } key={ i }>
            <View style={ this.state.currentClassificationIndex === i ? [styles.tabItem, styles.currentTab] : styles.tabItem }>
                <Text>
                {item.name}
                </Text>
            </View>
        </TouchableHighlight>
    )

    render() {
        return (
            <View>
                <ScrollView style={ styles.scrollView }
                alwaysBounceVertical={ false }>
                    <View style={ styles.content }>
                        <View style={ styles.tabWrap }>
                        { this.state.classificationData.map(this.createTab) }
                        </View>
                        <View style={ styles.detail }>
                        { this.state.currentClassificationList.map(this.createList) }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    fetchList = async () => {
        try {
            const res: any = await APIs.search.getClassificationList();
            const calssificationData: any[] = res.data;
            this.setState({
                classificationData: calssificationData || [],
                currentClassificationList: calssificationData[0].list || []
            });
        }
        catch (e) {

        }
    }
    onTabPress = (i: any) => {
        this.setState({
            currentClassificationIndex: i,
            currentClassificationList: this.state.classificationData[i].list || []
        });
    }
    onItemPress = (name: any) => {
        Store.update("search.filterInfo.classification", name);
        Navigator.backToTab(Routes.ROUTES_TAB_SEARCH);
    }
}