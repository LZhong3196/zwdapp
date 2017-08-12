import * as React from "react";
import {
    Container,
    Content,
    Text,
    Item,
    Right,
    Button,
    Input
} from "native-base";
import { Widgets, APIs, Store, Constants, Navigator, Routes } from "summer";
let { Icon, Toast, theme } = Widgets;

import { styles } from "./style";

const CodeType: Dictionary<number> = {
    [Routes.ROUTES_REGISTER]: 0,
    [Routes.ROUTES_RESET_PASSWORD]: 1
};

export default class IdentificationScreen extends React.Component<any, any> {
    static navigationOptions = (navigation: any) => ({
        title: navigation.navigation.state.params.nextRoute === Routes.ROUTES_REGISTER ? "注册" : "忘记密码",
        headerStyle: styles.header
    })

    private timer: number = 0;
    private duration: number = 60;
    private unmount: boolean = false;

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            mobile: undefined,
            code: undefined,
            mobileValid: false,
            codeValid: false,
            seconds: 0
        };
    }

    componentWillUnmount() {
        this.unmount = true;
    }

    render() {
        let {
            code,
            mobile,
            codeValid,
            mobileValid,
            seconds
        } = this.state;
        const codeDisable: boolean = !mobileValid || !!seconds;
        const submitDisable: boolean = !mobileValid || !codeValid;
        return (
            <Container style={styles.container}>
                <Item regular style={styles.item}>
                    <Icon type="&#xe622;" color={theme.color_grey} />
                    <Input
                        placeholder="请输入手机号"
                        value={mobile}
                        style={styles.input}
                        placeholderTextColor={theme.color_grey}
                        onChangeText={this.onMobileValueChange} />
                    <Right>
                        <Button
                            disabled={codeDisable}
                            onPress={this.getIdentificationCode}
                            style={!codeDisable ? styles.button : styles.buttonDisable}>
                            <Text style={styles.timerInfo}>{!seconds ? `获取验证码` : `${seconds} 秒`}</Text>
                        </Button>
                    </Right>
                </Item>
                <Item regular style={{ ...styles.item, ...styles.lastItem }}>
                    <Icon type="&#xe68d;" color={theme.color_grey} />
                    <Input
                        placeholder="请输入验证码"
                        value={code}
                        style={styles.input}
                        placeholderTextColor={theme.color_grey}
                        onChangeText={this.onCodeChange} />
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

    onMobileValueChange = (value: any) => {
        this.state.mobile = value;
        this.state.mobileValid = /^1\d{10}$/.test(value);
        this.setState(this.state);
    }

    onCodeChange = (value: any) => {
        /** todo - 校验规则 */
        this.state.code = value;
        this.state.codeValid = !!value.length;
        this.setState(this.state);
    }

    getIdentificationCode = async () => {
        this.setState({
            seconds: this.duration
        });
        this.countDown();
        try {
            const res: any = await APIs.account.getIdentificationCode({
                mobile: this.state.mobile
            });
        }
        catch (e) {

        }
    }

    countDown = () => {
        this.timer = setInterval(() => {
            if (this.unmount) return;
            this.setState({
                seconds: this.state.seconds - 1
            });
            if (!this.state.seconds) {
                clearInterval(this.timer);
                this.setState({
                    seconds: 0
                });
            }
        }, 1000);
    }

    onSubmit = async () => {
        Toast.loading();
        let nextRoute: string = this.props.navigation.state.params.nextRoute;
        try {
            const res: any = await APIs.account.postIdentificationCode({
                code: this.state.code,
                type: CodeType[nextRoute]
            });
            if (!!res.data.status) {
                Toast.info({
                    text: "验证码验证失败, 请重试",
                    duration: 2500
                });
            }
            else {
                Toast.success({
                    text: "验证成功"
                });
                if (nextRoute === Routes.ROUTES_REGISTER) {
                    Store.update("user.account", this.state.mobile);
                }
                Navigator.to(nextRoute);
            }
        }
        catch (e) { }
    }
}
