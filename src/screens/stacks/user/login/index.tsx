import * as React from "react";
import { Image, ViewProperties } from "react-native";
import {
    Store,
    Constants,
    APIs,
    Widgets,
    Decorators,
    Navigator,
    Routes
} from "summer";
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
import { UMSocial, UMUserInfo } from "summer-native-modules";
import { Row, Grid, Col } from "react-native-easy-grid";
import SocialLogin from "./social-login";
import { styles } from "./style";


let { Icon, Toast, theme, Divider } = Widgets;

const accountLimit: number = 22;
const passwordLimit: number = 22;

interface EditFormProps extends ViewProperties {
    handleAuthTodo: (resolve: boolean | string) => void;
    updateProfile: () => void;
}

class EditForm extends React.Component<EditFormProps, any> {
    constructor(props: EditFormProps, context: any) {
        super(props, context);
        this.state = {
            account: undefined,
            password: undefined,
            accountError: undefined,
            passwordError: undefined
        };
    }

    componentWillMount() {
        const accountInfo: any = Store.get("user.account") || {};
        this.setState({
            account: accountInfo.account,
            password: accountInfo.password
        });
    }

    componentWillReceiveProps(nextProps: any) {
        const accountInfo: any = Store.get("user.account") || {};
        const shouldUpdate: boolean = accountInfo.account !== this.state.account || accountInfo.password !== this.state.password;
        if (shouldUpdate) {
            this.setState({
                account: accountInfo.account,
                password: accountInfo.password
            });
        }
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
                    {!!account ? <Icon
                        type="&#xe60b;"
                        color={theme.color_grey}
                        style={styles.resetButton}
                        onPress={this.resetAccountValue} /> : null}
                </Item>
                <Item regular style={{ ...styles.inputItem, ...styles.lastItem }}>
                    <Icon type="&#xe68d;" color="#BFBFBF" />
                    <Input
                        placeholder="请输入密码"
                        value={password}
                        secureTextEntry
                        placeholderTextColor="#BDBDBE"
                        onChangeText={this.onPasswordChange} />
                    {!!password ? <Icon
                        type="&#xe60b;"
                        color={theme.color_grey}
                        style={styles.resetButton}
                        onPress={this.resetPasswordValue} /> : null}
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
        this.setState({
            account: undefined
        });
    }

    resetPasswordValue = () => {
        this.setState({
            password: undefined
        });
    }

    onAccountChange = (value: any) => {
        this.setState({ account: value });
    }

    onPasswordChange = (value: any) => {
        this.setState({ password: value });
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
            Store.update("user.account", account);
            Navigator.back();

            this.props.handleAuthTodo(res.data.token);
            this.props.updateProfile();
        }
        catch (e) {
            /** 登录失败 error */
        }
    }

    register = () => {
        Navigator.to(Routes.ROUTES_IDENTIFICATION, {
            nextRoute: Routes.ROUTES_REGISTER
        });
    };

    retrievePassword = () => {
        Navigator.to(Routes.ROUTES_IDENTIFICATION, {
            nextRoute: Routes.ROUTES_RESET_PASSWORD
        });
    };

}

@Decorators.connect("user")
export default class LoginScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerStyle: styles.header
    };

    componentWillUnmount() {
        this.handleAuthTodo(false);
    }

    render() {
        return (
            <Grid style={styles.container}>
                <Image
                    source={require("./images/header.png")}
                    style={styles.backgroundImage} />
                <Row size={3} >
                    <EditForm
                        handleAuthTodo={this.handleAuthTodo}
                        updateProfile={this.updateProfile}/>
                </Row>
                <Row size={2}>
                    <SocialLogin 
                        handleAuthTodo={this.handleAuthTodo}
                        updateProfile={this.updateProfile}/>
                </Row>
            </Grid>
        );
    }

    handleAuthTodo = (resolve: boolean | string) => {
        if (!!Store.get("data.resolveTodo")) {
            let resolveTodo: any = Store.get("data.resolveTodo");
            let res = resolveTodo(resolve);
            Store.update("data.resolveTodo", "");
        }
    }

    updateProfile = async () => {
        const profileRes: any = await APIs.user.getUserInfo({});
        Store.update("user.profile", profileRes.data);
    };

}
