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
import { Widgets, APIs } from "summer";
let { Icon, Toast } = Widgets;

import { styles } from "./style";

export default class IdentificationScreen extends React.Component<any, any> {
    static navigationOptions = (navigation: any) => ({
        title: navigation.navigation.state.params.header || "",
        headerStyle: styles.header
    })
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            mobile: undefined,
            code: undefined,
            mobileValid: false,
            codeValid: false,
            duration: 0
        };
    }

    render() {
        let {
            code,
            mobile,
            codeValid,
            mobileValid,
            duration
        } = this.state;
        return (
            <Container style={styles.container}>
                <Item regular style={styles.item}>
                    <Icon type="&#xe622;" color="#BFBFBF" />
                    <Input
                        placeholder="请输入手机号"
                        value={mobile}
                        style={styles.input}
                        placeholderTextColor="#BDBDBE"
                        onChangeText={this.onMobileValueChange} />
                    <Right>
                        <Button
                            disabled={!mobileValid}
                            onPress={this.getIdentificationCode}
                            style={styles.button}>
                            <Text>{!duration ? `获取验证码` : `${duration} 秒`}</Text>
                        </Button>
                    </Right>
                </Item>
                <Item regular style={{ ...styles.item, ...styles.lastItem }}>
                    <Icon type="&#xe68d;" color="#BFBFBF" />
                    <Input
                        placeholder="请输入验证码"
                        value={code}
                        style={styles.input}
                        placeholderTextColor="#BDBDBE"
                        onChangeText={this.onCodeChange} />
                </Item>
                <Button
                    block
                    disabled={!mobileValid || !codeValid}
                    style={styles.button}
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
    };

    onCodeChange = (value: any) => {
        this.state.code = value;
        this.state.codeValid = !!value.length;
        this.setState(this.state);
    }

    getIdentificationCode = async () => {
        try {
            const res: any = await APIs.account.getIdentificationCode({
                mobile: this.state.mobile
            });
        }
        catch (e) {

        }
    }

    onSubmit = async () => {
        Toast.loading();
        try {
            const res: any = await APIs.account.postIdentificationCode({
                code: this.state.code
            });
            if (!!res.data.status) {
                Toast.info({
                    text: "验证码验证失败, 请重试"
                });
            }
            else {
                Toast.success({
                    text: "验证成功"
                });
            }
        }
        catch (e) { }
    }

}
