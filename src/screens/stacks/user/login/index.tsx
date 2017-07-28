import * as React from "react";
import { } from "react-native";
import { AppStore, Constants, APIs, Widgets, Decorators } from "summer";
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Text,
    Button
} from "native-base";
import { Row, Grid } from "react-native-easy-grid";
import { styles } from "./style";

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
                <Item rounded last>
                    <Icon type="&#xe600;" color="#BFBFBF"/>
                    <Input
                        style={styles.accountInput}
                        placeholder="请输入用户名/手机号"
                        value={account}
                        onChangeText={this.onAccountChange} />
                </Item>
                <Item>
                    <Text style={styles.errorInfo}>
                        {accountError || ""}
                    </Text>
                </Item>
                <Item rounded last>
                    <Icon type="&#xe68d;" color="#BFBFBF"/>
                    <Input
                        style={styles.passwordInput}
                        placeholder="请输入密码"
                        value={password}
                        onChangeText={this.onPasswordChange} />
                </Item>
                <Item>
                    <Text style={styles.errorInfo}>
                        {passwordError || ""}
                    </Text>
                </Item>
                <Button
                    block
                    rounded
                    onPress={this.onSubmit}
                    style={styles.loginButton}>
                    <Text>登录</Text>
                </Button>
            </Form>
        );
    }

    onAccountChange = (value: any) => {
        if (value.length > accountLimit) {
            this.setState({
                accountError: `账号名长度请小于 ${accountLimit} 个字节`
            });
            return;
        }
        this.state.account = value;
        this.state.accountError = undefined;
        this.setState(this.state);
    }

    onPasswordChange = (value: any) => {
        if (value.length > passwordLimit) {
            this.setState({
                accountError: `密码长度请小于 ${passwordLimit} 个字节`
            });
            return;
        }
        this.state.password = value;
        this.setState(this.state);
    }

    onSubmit = async () => {
        if (!this.state.account) {
            /** error */
            return;
        }

        if (!this.state.password) {
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
}


export default class LoginScreen extends React.Component<any, any> {
    static navigationOptions = {
        headerStyle: styles.header
    };
    render() {
        return (
            <Grid style={styles.container}>
                <Row size={4} >
                    <EditForm />
                </Row>
                <Row size={1}>
                </Row>
            </Grid>
        );
    }

}

