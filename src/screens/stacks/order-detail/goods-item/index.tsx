import React, { PureComponent } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from "react-native";
import { Button } from "native-base";
import { Widgets, Constants, Routes, Store } from "summer";

let { theme } = Widgets;

interface GoodsItemProps {
  id: string;
  title: string;
  color: string;
  size: string;
  num: number;
  price: number;
  thumbnail: string;
  completed: boolean;
  onConfirmedPurchase?: any;
  showPurchaseStatus?: boolean;
}

class GoodsItem extends PureComponent<GoodsItemProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      completed: this.props.completed
    };
  }
  render() {
    const { title, color, size, num, price, thumbnail } = this.props;
    return (
      <TouchableOpacity onPress={ this.goToDetail }>
        <View style={ styles.container }>
          <Image source={ { uri: thumbnail } } style={ styles.thumbnail } />
          <View style={ styles.infoContainer }>
            <Text style={ styles.title } numberOfLines={ 2 }>{ title }</Text>
            <View style={ styles.infoItem }>
              <Text style={ [styles.infoLeft, styles.colorGrey] }>颜色：{ color }</Text>
              <Text style={ styles.colorGrey }>x { num }</Text>
            </View>
            <View style={ styles.infoItem }>
              <Text style={ [styles.infoLeft, styles.colorGrey] }>尺寸：{ size }</Text>
              { this.renderPurchase() }
            </View>
            <Text style={ styles.price }>￥{ price }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderPurchase(): any {
    const { completed } = this.state;
    const { showPurchaseStatus } = this.props;

    if (!showPurchaseStatus) {
      return null;
    }

    if (completed) {
      return <Text style={ styles.purchasedText }>已拿货</Text>;
    } else {
      return (
        <Button bordered style={ {
          paddingRight: 6,
          paddingLeft: 6,
          height: 20,
          borderColor: theme.color_base
        } }
          onPress={ this.onConfirmPurchaseBtnClick }
        >
          <Text style={ styles.btnConfirmPurchaseText }>确认收货</Text>
        </Button>);
    }
  }

  onConfirmPurchaseBtnClick = () => {
    Alert.alert(
      "确认已拿货吗？",
      null,
      [
        { text: "取消" },
        {
          text: "确认", onPress: () => {
            this.setState({
              completed: true
            });
            const { onConfirmedPurchase } = this.props;

            if (typeof (onConfirmedPurchase) === "function") {
              onConfirmedPurchase();
            }
          }
        }
      ]
    );
  }

  goToDetail = () => {
    const { id } = this.props;
    Store.dispatch({
      type: Constants.ACTIONTYPES_NAVIGATION_TO,
      meta: {
        routeName: Routes.ROUTES_GOODS,
        params: {
          id: id
        }
      }
    });
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: theme.border_width_sm,
    borderBottomColor: theme.color_grey,
    flexDirection: "row"
  },

  title: {
    fontSize: theme.font_size_base,
    lineHeight: theme.font_size_base + 2
  },

  thumbnail: {
    width: 100,
    height: 100
  },

  infoContainer: {
    flex: 1,
    marginLeft: 10,
    marginVertical: 2,
    justifyContent: "space-between"
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center"
  },

  infoLeft: {
    flex: 1
  },
  price: {
    color: theme.color_theme,
  },
  colorGrey: {
    color: theme.color_grey,
    fontSize: theme.font_size_caption_sm
  },
  btnConfirmPurchaseText: {
    color: theme.color_base,
    fontSize: 12
  },
  purchasedText: {
    color: "#34b704",
    fontSize: theme.font_size_caption_sm
  }
});

export default GoodsItem;