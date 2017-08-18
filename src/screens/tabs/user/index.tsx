import * as React from "react";
import {
    StatusBar,
    ScrollView,
    RefreshControl,
    View
} from "react-native";
import { NavigationActions } from "react-navigation";
import { Store, Constants, Widgets, APIs, Decorators, Navigator, Routes } from "summer";
import {
    Container,
    Content,
    Thumbnail,
    Button,
    Left,
    Body,
    Text,
    Card,
    CardItem,
    Header,
    Right,
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { styles, headerStyle, menuStyle } from "./style";
let { TabBarIcon, Icon, Toast, theme, ImageExtra } = Widgets;


/** replace  */
const headerBgStatic = require("./images/header.png");
const backgroundImageStatic = require("./images/background.png");

@Decorators.connect( "user" )
export default class UserScreen extends React.Component<any, any> {
    private unmount: boolean = false;
    static navigationOptions = {
        title: "个人中心",
        tabBarLabel: "我的",
        tabBarIcon: (options: any) => (
            <TabBarIcon
                type="&#xe600;"
                activeType="&#xe765;"
                focused={options.focused} />
        )
    };

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            loading: false
        };
    }

    componentWillMount() {
        // this.fetchUserInfo();
    }

    componentWillUnmount() {
        this.unmount = true;
    }

    render() {
        const refreshControl = (
            <RefreshControl
                title="下拉刷新"
                tintColor={theme.color_background}
                titleColor={theme.color_background}
                refreshing={this.state.loading}
                onRefresh={this.fetchUserInfo} />
        );
        const userInfo: any = Store.get("user.profile") || {};

        const bannerImageSource: any = !!userInfo.banner ? {
            uri: userInfo.banner
        } : headerBgStatic;

        const backgroundImageSource: any = !!userInfo.refreshBackground ? {
            uri: userInfo.refreshBackground
        } : backgroundImageStatic;

        return (
            <View style={styles.view}>
                <ImageExtra
                    source={backgroundImageSource}
                    style={styles.backgroundImage} />
                <ScrollView
                    contentContainerStyle={styles.container}
                    style={styles.scrollView}
                    automaticallyAdjustContentInsets={false}
                    refreshControl={refreshControl}>
                    <Grid style={styles.grid}>
                        <Row style={headerStyle.container} >
                            <Row style={headerStyle.background}>
                                <ImageExtra source={bannerImageSource} style={styles.backgroundImage} />
                            </Row>
                            <Row style={headerStyle.title}>
                                <Left style={headerStyle.titleLeft}>
                                    <Text
                                        onPress={this.handleProfileSetting}
                                        style={headerStyle.titleLeftText}>
                                        设置
                                    </Text>
                                </Left>
                                <Right style={headerStyle.titleRight}>
                                    <Icon type="&#xe613;" color={theme.color_background} onPress={this.handleSetting} />
                                </Right>
                            </Row>
                            <Row style={headerStyle.caption}>
                                <Col style={headerStyle.avatarContainer}>
                                    <Thumbnail
                                        source={{ uri: userInfo.avatar }} />
                                </Col>
                                <Col size={1}>
                                    <Text style={headerStyle.userName}>
                                        {userInfo.account || "未设置"}
                                    </Text>
                                </Col>
                            </Row>
                        </Row>
                        <Row style={menuStyle.container}>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe71e;"
                                    size={40}
                                    color="#FF0000" />
                                <Text style={menuStyle.itemText}>关注宝贝</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe684;"
                                    size={40}
                                    color="#FF6E51" />
                                <Text style={menuStyle.itemText}>关注档口</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe673;"
                                    size={40}
                                    color="#FF9107" />
                                <Text style={menuStyle.itemText}>微商品</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe6f5;"
                                    size={40}
                                    color="#FF4307" />
                                <Text style={menuStyle.itemText}>微图库</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe617;"
                                    size={40}
                                    color="#FF5A37" />
                                <Text style={menuStyle.itemText}>采购单</Text>
                            </Button>
                        </Row>
                        <Row style={menuStyle.title}>
                            <Text style={menuStyle.titleText}>周边服务</Text>
                        </Row>
                        <Row style={menuStyle.container}>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe6c1;"
                                    size={40}
                                    color="#FFA936" />
                                <Text style={menuStyle.itemText}>快递查询</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe688;"
                                    size={40}
                                    color="#5C9FE0" />
                                <Text style={menuStyle.itemText}>档口出租</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe61b;"
                                    size={40}
                                    color="#FF2A27" />
                                <Text style={menuStyle.itemText}>代发团队</Text>
                            </Button>
                            <Button transparent style={menuStyle.item}>
                                <Icon
                                    type="&#xe805;"
                                    size={40}
                                    color="#55D658" />
                                <Text style={menuStyle.itemText}>全民摄影</Text>
                            </Button>
                        </Row>
                        <Row style={menuStyle.title}>
                            <Text style={menuStyle.titleText}>帮助咨询</Text>
                        </Row>
                        <Row style={menuStyle.container}>
                            <Button
                                onPress={this.showToast}
                                transparent
                                style={menuStyle.item}>
                                <Icon
                                    type="&#xe604;"
                                    size={40}
                                    color="#FF61A3" />
                                <Text style={menuStyle.itemText}>联系客服</Text>
                            </Button>
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        );
    }

    showToast = () => {
        Toast.show({
            text: "处理中"
        });
    }

    handleSetting = () => {
        Navigator.to(Routes.ROUTES_SETTING);
    }

    handleProfileSetting = () => {
        Navigator.to(Routes.ROUTES_SETTING);
    }


    fetchUserInfo = async () => {
        this.state.loading = true;
        this.setState(this.state);
        try {
            const res: any = await APIs.user.getUserInfo({});
            Store.update("user.profile", res.data);
        }
        catch (e) {
            if (this.unmount) {
                return;
            }
        }
        this.setState({
            loading: false
        });
    }
}




