import * as React from "react";
import {
    Container,
    Content,
    Text,
    Item,
    Input,
    Button
} from "native-base";
import { Store, Constants, Widgets, APIs, Navigator, Routes } from "summer";
import { styles } from "./style";
let { Icon, theme, Toast } = Widgets;

export default class PasswordSettingScreen extends React.Component<any, any> {
    static navigationOptions = (navigation: any) => ({
        title: navigation.navigation.state.routeName === Routes.ROUTES_REGISTER ? "注册" : "重设密码",
        headerStyle: styles.header
    })

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            password: undefined,
            passwordConfirm: undefined
        };
    }
    render() {
        let {
            password,
            passwordConfirm
        } = this.state;

        const submitDisable: boolean = !password || !passwordConfirm;

        return (
            <Container style={styles.container}>
                <Item regular style={styles.item}>
                    <Icon type="&#xe68d;" color={theme.color_grey} />
                    <Input
                        secureTextEntry
                        placeholder="请输入新密码"
                        value={password}
                        style={styles.input}
                        placeholderTextColor={theme.color_grey}
                        onChangeText={this.onPasswordValueChange} />
                    {!!password ? <Icon
                        type="&#xe60b;"
                        color={theme.color_grey}
                        style={styles.resetButton}
                        onPress={this.resetPasswordValue} /> : null}
                </Item>
                <Item regular style={{ ...styles.item, ...styles.lastItem }}>
                    <Icon type="&#xe68d;" color={theme.color_grey} />
                    <Input
                        secureTextEntry
                        placeholder="再次输入新密码"
                        value={passwordConfirm}
                        style={styles.input}
                        placeholderTextColor={theme.color_grey}
                        onChangeText={this.onConfirmValueChange} />
                    {!!passwordConfirm ? <Icon
                        type="&#xe60b;"
                        color={theme.color_grey}
                        style={styles.resetButton}
                        onPress={this.resetConfirmValue} /> : null}
                </Item>
                <Button
                    block
                    disabled={submitDisable}
                    style={!submitDisable ? styles.button : styles.buttonDisable}
                    onPress={this.onSubmit}>
                    <Text>下一步</Text>
                </Button>
            </Container>
        );
    }

    resetPasswordValue = () => {
        this.state.password = undefined;
        this.setState(this.state);
    }

    resetConfirmValue = () => {
        this.state.passwordConfirm = undefined;
        this.setState(this.state);
    }

    onPasswordValueChange = (value: any) => {
        this.state.password = value;
        this.setState(this.state);
    }
    onConfirmValueChange = (value: any) => {
        /** todo - valid */
        if (value.length > 20) {
            return;
        }
        this.state.passwordConfirm = value;
        this.setState(this.state);
    }

    onSubmit = async () => {
        if (this.state.passwordConfirm !== this.state.password) {
            Toast.info({
                text: "两次输入的密码不一致"
            });
            return;
        }
        Toast.loading();
        try {
            const res: any = await APIs.account.postPasswordReset({
                password: this.state.password
            });
            Toast.success({
                text: "修改成功"
            });

            Navigator.reset(Routes.ROUTES_LOGIN);

            let account: any = Store.get("user.account") || {};
            Store.update("user.account", {
                ...account,
                password: this.state.password
            });
        }
        catch (e) {
        }
    }
}
