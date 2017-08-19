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

const TitleMap: Dictionary<string> = {
    name: "真实姓名",
    account: "昵称",
    taobao_account: "旺旺账号",
    qq: "QQ账号",
    wechat: "微信账号"
};

const IconMap: Dictionary<string> = {
    name: "&#xe765;",
    account: "&#xe600;",
    taobao_account: "&#xe696;",
    qq: "&#xe60c;",
    wechat: "&#xe61c;"
};

export default class ProfileEditScreen extends React.Component<any, any> {
    private input: any;
    static navigationOptions = (navigation: any) => ({
        title: TitleMap[navigation.navigation.state.params.name],
        headerStyle: styles.header
    })

    constructor(props: any, context: any) {
        super(props, context);
        this.state = {
            value: undefined,
        };
    }

    componentWillMount() {
        this.setState({
            value: this.props.navigation.state.params.value || undefined
        });
    }

    componentWillReceiveProps(nextProps: any) {
        this.setState({
            value: this.props.navigation.state.params.value || undefined
        });
    }

    render() {
        const name: string = this.props.navigation.state.params.name || undefined;
        let {
            value,
        } = this.state;

        const submitDisable: boolean = false;

        return (
            <Container style={styles.container}>
                <Item regular style={styles.item}>
                    <Icon type={IconMap[name]} color={theme.color_grey} />
                    <Input
                        autoFocus
                        ref={(component: any) => this.input = component}
                        placeholder={`请输入${TitleMap[name]}`}
                        value={value}
                        style={styles.input}
                        placeholderTextColor={theme.color_grey}
                        onChangeText={this.onValueChange} />
                    {!!value ? <Icon
                        type="&#xe60b;"
                        color={theme.color_grey}
                        style={styles.resetButton}
                        onPress={this.resetValue} /> : null}
                </Item>
                <Button
                    block
                    disabled={submitDisable}
                    style={!submitDisable ? styles.button : styles.buttonDisable}
                    onPress={this.onSubmit}>
                    <Text>确认修改</Text>
                </Button>
            </Container>
        );
    }

    resetValue = () => {
        this.state.value = undefined;
        this.setState(this.state);
    }

    onValueChange = (value: any) => {
        this.state.value = value;
        this.setState(this.state);
    }


    onSubmit = async () => {
        Toast.loading();
        try {
            let profile: any = Store.get("user.profile") || {};
            const name: string = this.props.navigation.state.params.name || undefined;
            const profileUpdate: any = {
                ...profile,
                [name]: this.state.value
            };
            const res: any = await APIs.user.postUserInfo(profileUpdate);
            Toast.success({
                text: "修改成功"
            });
            Navigator.back();
            Store.update("user.profile", profileUpdate);
        }
        catch (e) {
        }
    }
}
