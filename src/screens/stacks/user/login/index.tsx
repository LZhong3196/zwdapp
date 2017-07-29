import * as React from "react";
import { Image } from "react-native";
import { AppStore, Constants, APIs, Widgets, Decorators } from "summer";
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Text,
    Button,
    Left,
    Right,
    View
} from "native-base";
import { Row, Grid, Col } from "react-native-easy-grid";
import { styles, thirdParty } from "./style";

let { Icon, Toast } = Widgets;


const accountLimit: number = 22;
const passwordLimit: number = 22;

class EditForm extends React.Component<any, any> {

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            account: undefined,
            password: undefined,
            accountError: undefined,
            passwordError: undefined
        };
    }

    componentWillMount() {
        const accountInfo: any = AppStore.get("user.account") || {};
        this.setState({
            account: accountInfo.account,
            password: accountInfo.password
        });
    }

    render() {
        const {
            account,
            password,
            accountError,
            passwordError
        } = this.state;
        return (
            <Form style={styles.formContainer}>
                <Item regular style={{ ...styles.inputItem, ...styles.firstItem }}>
                    <Icon type="&#xe600;" color="#BFBFBF" />
                    <Input
                        placeholder="请输入用户名/手机号"
                        value={account}
                        placeholderTextColor="#BDBDBE"
                        onChangeText={this.onAccountChange} />
                    <Icon
                        type="&#xe60b;"
                        color="#EEE"
                        style={styles.resetButton}
                        onPress={this.resetAccountValue} />
                </Item>
                <Item regular style={{ ...styles.inputItem, ...styles.lastItem }}>
                    <Icon type="&#xe68d;" color="#BFBFBF" />
                    <Input
                        placeholder="请输入密码"
                        value={password}
                        secureTextEntry
                        placeholderTextColor="#BDBDBE"
                        onChangeText={this.onPasswordChange} />
                    <Icon
                        type="&#xe60b;"
                        color="#EEE"
                        style={styles.resetButton}
                        onPress={this.resetPasswordValue} />
                </Item>
                <Button
                    block
                    onPress={this.onSubmit}
                    style={styles.loginButton}>
                    <Text>登录</Text>
                </Button>
                <Item style={styles.helpItemContainer}>
                    <Left>
                        <Text
                            onPress={this.register}
                            style={styles.helpItem}>
                            注册账号
                        </Text>
                    </Left>
                    <Right>
                        <Text
                            onPress={this.retrievePassword}
                            style={styles.helpItem}>
                            忘记密码
                        </Text>
                    </Right>
                </Item>
            </Form>
        );
    }

    resetAccountValue = () => {
        this.state.account = undefined;
        this.setState(this.state);
    }

    resetPasswordValue = () => {
        this.state.password = undefined;
        this.setState(this.state);
    }

    onAccountChange = (value: any) => {
        this.state.account = value;
        this.setState(this.state);
    }

    onPasswordChange = (value: any) => {
        this.state.password = value;
        this.setState(this.state);
    }

    onSubmit = async () => {
        if (!this.state.account) {
            /** error */
            Toast.show({
                text: "请输入账号"
            });
            return;
        }

        if (!this.state.password) {
            Toast.show({
                text: "请输入密码"
            });
            return;
        }

        Toast.loading();
        const data: any = {
            account: this.state.account.trim(),
            password: this.state.password.trim()
        };
        try {
            const res: any = await APIs.account.postLogin(data);
            let account: any = {
                token: res.data.token,
                isLoggedIn: true,
                ...data
            };
            Toast.success({
                text: "已登录"
            });
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_USER_UPDATE,
                meta: {
                    storeKey: "account",
                },
                payload: account
            });
            AppStore.dispatch({ type: Constants.ACTIONTYPES_LOGGED_IN });

            const profileRes: any = await APIs.user.getUserInfo({});
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_USER_UPDATE,
                meta: {
                    storeKey: "profile",
                },
                payload: profileRes.data
            });
        }
        catch (e) {
            /** 登录失败 error */
        }
    }

    register = () => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_IDENTIFICATION,
                params: {
                    header: "注册",
                    next: Constants.ROUTES_REGISTER,
                }
            }
        });
    };

    retrievePassword = () => {
        AppStore.dispatch({
            type: Constants.ACTIONTYPES_NAVIGATION_TO,
            meta: {
                routeName: Constants.ROUTES_IDENTIFICATION,
                params: {
                    header: "修改密码",
                    next: Constants.ROUTES_RETRIEVE_PASSWORD,
                }
            }
        });
    };
}


class ThirdParty extends React.Component<any, any> {
    render() {
        return (
            <View style={thirdParty.container}>
                <Item style={thirdParty.titleContainer}>
                    <Text style={thirdParty.title}>快速登录</Text>
                </Item>
                <Item style={thirdParty.optionContainer}>
                    <Col style={thirdParty.optionItem}>
                        <Icon type="&#xe639;" color="#00C806" size={32} style={thirdParty.itemIcon} />
                        <Text style={thirdParty.optionText}>微信登录</Text>
                    </Col>
                    <Col style={thirdParty.optionItem}>
                        <Icon type="&#xe60c;" color="#4BBAEA" size={32} style={thirdParty.itemIcon} />
                        <Text style={thirdParty.optionText}>QQ登录</Text>
                    </Col>
                    <Col style={thirdParty.optionItem}>
                        <Icon type="&#xe696;" size={32} style={thirdParty.itemIcon} />
                        <Text style={thirdParty.optionText}>旺旺登录</Text>
                    </Col>
                </Item>
            </View>
        );
    }
}

export default class LoginScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerStyle: styles.header
    };
    render() {
        return (
            <Grid style={styles.container}>
                <Image
                    source={require("./images/header.png")}
                    style={styles.backgroundImage} />
                <Row size={3} >
                    <EditForm />
                </Row>
                <Row size={2}>
                    <ThirdParty />
                </Row>
            </Grid>
        );
    }
}

