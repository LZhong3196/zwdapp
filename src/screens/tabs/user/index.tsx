import * as React from "react";
import {
    StatusBar,
    ScrollView,
    RefreshControl,
    View,
    ViewProperties
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


interface UserHeaderProps extends ViewProperties {
    userInfo: any;
}

@Decorators.pureRender()
class UserHeader extends React.Component<UserHeaderProps, any> {
    render() {
        const { userInfo } = this.props;
        const bannerImageSource: any = !!userInfo.banner ? {
            uri: userInfo.banner
        } : headerBgStatic;

        return (
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
                            style={headerStyle.avatar}
                            source={{ uri: userInfo.avatar }} />
                    </Col>
                    <Col size={1}>
                        <Text style={headerStyle.userName}>
                            {userInfo.account || "未设置"}
                        </Text>
                    </Col>
                </Row>
            </Row>
        )
    }

    handleSetting = () => {
        Navigator.to(Routes.ROUTES_SETTING);
    }


    handleProfileSetting = () => {
        Navigator.to(Routes.ROUTES_SETTING);
    }
}

interface MenuItemProps extends ViewProperties {
    title: string;
    iconType: string;
    iconColor: string;
    onPress?: () => void;
}

@Decorators.pureRender()
class MenuItem extends React.Component<MenuItemProps, any> {
    static defaultProps = {
        onPress: () => {}
    };
    render() {
        const {
            title,
            iconType,
            iconColor,
            onPress
        } = this.props;
        return (
            <Button
                onPress={(e?: any) => onPress()}
                transparent
                style={menuStyle.item}>
                <Icon
                    type={iconType}
                    size={40}
                    color={iconColor} />
                <Text style={menuStyle.itemText}>{title}</Text>
            </Button>
        )
    }
}

@Decorators.pureRender()
@Decorators.connect("user")
class User extends React.Component<any, any> {
    private unmount: boolean = false;
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            loading: false
        };
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
                        <UserHeader userInfo={userInfo} />
                        <Row style={menuStyle.container}>
                            <MenuItem iconType="&#xe71e;" iconColor="#FF0000" title="关注宝贝" />
                            <MenuItem iconType="&#xe684;" iconColor="#FF6E51" title="关注档口" />
                            <MenuItem iconType="&#xe673;" iconColor="#FF9107" title="微商品" />
                            <MenuItem iconType="&#xe6f5;" iconColor="#FF4307" title="微图库" />
                            <MenuItem iconType="&#xe617;" iconColor="#FF5A37" title="采购单" />
                        </Row>
                        <Row style={menuStyle.title}>
                            <Text style={menuStyle.titleText}>周边服务</Text>
                        </Row>
                        <Row style={menuStyle.container}>
                            <MenuItem iconType="&#xe6c1;" iconColor="#FFA936" title="快递查询" />
                            <MenuItem iconType="&#xe688;" iconColor="#5C9FE0" title="档口出租" />
                            <MenuItem iconType="&#xe61b;" iconColor="#FF2A27" title="代发团队" />
                            <MenuItem iconType="&#xe805;" iconColor="#55D658" title="全民摄影" />
                        </Row>
                        <Row style={menuStyle.title}>
                            <Text style={menuStyle.titleText}>帮助咨询</Text>
                        </Row>
                        <Row style={menuStyle.container}>
                            <MenuItem iconType="&#xe604;" iconColor="#FF61A3" title="联系客服" onPress={this.showToast} />
                        </Row>
                    </Grid>
                </ScrollView>
            </View>
        )
    }
    showToast = () => {
        Toast.show({
            text: "处理中"
        });
    }

    fetchUserInfo = async () => {
        this.setState({
            loading: true
        });
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


export default class UserScreen extends React.Component<any, any> {
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

    render() {
        return ( <User /> );
    }
}




