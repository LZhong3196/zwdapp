import * as React from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal
} from "react-native";
import { Constants, APIs, Store, Decorators, Widgets, Navigator, Routes } from "summer";
import { styles } from "./style";
const { Icon, theme: {
    color_base
} } = Widgets;

interface SearchBarProps {
    rightButton?: any;
    placeholder?: string;
    onFocus?: () => void;
}

@Decorators.connect("data")
export default class SearchBar extends React.Component<SearchBarProps, any> {
    constructor(props: SearchBarProps, context: any) {
        super(props);
        this.state = {
            isShowSelect: false
        };
    }

    componentDidMount() {
        this.getCityList();
    }
    getCityList = async () => {
        try {
            /**TODO 使用第三方定位 , 获取当前位置 , 应该判断是否有初始值调用 , 只调用一次*/
            /**不能放在持久化数据中*/
            const city = "广州";
            const res: any = await APIs.data.getCityList();
            const cityList: any[] = res.data || [];
            Store.update("data.city", {
                city,
                list: cityList
            });
        }
        catch (e) {
        }
    }
    render() {
        const cityList: any[] = Store.get("data.city.list") || [];
        const currentCity: string = Store.get("data.city.city") || "定位中";
        const createCitys =  (cityInfo: any) => (
            <TouchableOpacity
                key={cityInfo.cid}
                onPress={ () => this.changeCity(cityInfo.name)}>
                <View style={ currentCity === cityInfo.name ? [styles.cityItem, styles.selectedCity] : styles.cityItem }>
                    <Text style={currentCity === cityInfo.name ? {color: "#fff"} : {}}>{cityInfo.name}</Text>
                </View>
            </TouchableOpacity>
        );
        return (
            <View style={ styles.header }>
                <TouchableOpacity
                    onPress={this.citySelectToggle}>
                    <View style={ styles.cityButton }>
                        <Text style={ styles.city }>
                            {currentCity}
                        </Text>
                        <Icon color={ color_base } type="&#xe61a;" size="xxs"/>
                    </View>
                </TouchableOpacity>
                <View style={ styles.inputWrap }>
                    <Icon color={ color_base } type="&#xe655;" />
                    <TextInput
                        style={ styles.input }
                        underlineColorAndroid="transparent"
                        placeholder={ this.props.placeholder }
                        onFocus={ this.props.onFocus }/>
                    <TouchableOpacity
                        onPress={ this.openQRScanner }>
                        <Icon color={ color_base } type="&#xe645;"/>
                    </TouchableOpacity>
                </View>
                { this.props.rightButton }
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.isShowSelect}
                    onRequestClose={() => {}}>
                    <TouchableWithoutFeedback
                        onPress={this.citySelectToggle}>
                        <View>
                            <View style={styles.cover}>
                                <View style={styles.cityWrap}>
                                    { cityList.map(createCitys) }
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                </Modal>
            </View>
        );
    }
    openQRScanner = () => {
        Navigator.to(Routes.ROUTES_SCANNER);
    }
    changeCity = (city: string) => {
        this.citySelectToggle();
        Store.update("data.city.city", city);
    }
    citySelectToggle = () => {
        this.setState({
            isShowSelect: !this.state.isShowSelect
        });
    }
}

