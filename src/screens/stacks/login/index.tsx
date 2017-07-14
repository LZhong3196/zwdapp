import * as React from "react";
import { } from "react-native";
import { AppStore, Constants, APIs } from "summer";
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

class EditForm extends React.Component<any, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            account: undefined,
            password: undefined
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
        return (
            <Form >
                <Item floatingLabel>
                    <Label> 用户名 </Label>
                    <Input
                        value={this.state.account}
                        onChangeText={this.onAccountChange} />
                </Item>
                <Item floatingLabel last>
                    <Label> 密码 </Label>
                    <Input
                        value={this.state.password}
                        onChangeText={this.onPasswordChange}/>
                </Item>
                <Button
                    block
                    warning
                    onPress={this.onSubmit}>
                    <Text>登录</Text>
                </Button>
            </Form>
        );
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
            return;
        }

        if (!this.state.password) {
            return;
        }

        const data: any = {
            account: this.state.account.trim(),
            password: this.state.password.trim()
        }
        try {
            const res: any = await APIs.account.postLogin(data);
            AppStore.dispatch({
                type: Constants.ACTIONTYPES_USER_UPDATE,
                meta: {
                    storeKey: "account",
                },
                payload: data
            });
            AppStore.dispatch({ type: Constants.ACTIONTYPES_LOGGED_IN });
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
            <Container >
                <Grid style={styles.container}>
                    <Row style={styles.row}>
                        <Content>
                            <EditForm />
                        </Content>
                    </Row>
                </Grid>
            </Container>
        );
    }

}

