import React, { Component } from "react";
import {
  ScrollView,
  Text
} from "react-native";
import {
  Button,
  Icon,
  Container,
} from "native-base";
import { APIs, Store, Constants, Decorators, Navigator, Widgets } from "summer";
import CollapsiblePanel from "../../../components/collapsible-panel";
import GoodsCard from "./goods-card";
import Footer from "./footer";
import { OrderStatus } from "../../tabs/order";
import EmptyResult from "../../../components/empty-result";

let { Toast } = Widgets;

@Decorators.pureRender()
class OrderDetailScreen extends Component<any, any> {
  static navigationOptions = ({ navigation }: any) => {
    const { params } = navigation.state;
    const btnEditTitle = {
      backgroundColor: "transparent",
      height: 30
    };

    return {
      title: params.title,
      headerRight: (
        params.status === OrderStatus.Working ?
          <Button style={ btnEditTitle } transparent><Icon name="ios-create-outline" style={ { color: "#333" } } /></Button> : null
      ),
      headerStyle: {
        backgroundColor: "#fff"
      }
    };
  }

  constructor(props: any) {
    super(props);

    this.state = {
      completedGoods: 0,
      fetching: true,
    };
  }

  componentDidMount() {
    Toast.loading();
    this.fetchData();
  }

  render() {
    const { id } = this.props.navigation.state.params;
    let order: any = Store.get(`order.${id}`) || {};
    const { completedGoods } = this.state;

    if (order.items && order.items.length > 0) {
      return (
        <Container>
          <ScrollView>
            {
              order.items && order.items.map((item: any) => {
                return (
                  <GoodsCard
                    key={ item.shop_id }
                    shop={ item.shop_name }
                    goods={ item.goods }
                    showPurchaseStatus={ order.status === OrderStatus.Working }
                    onConfirmedPurchase={ this.updateCompletedGoods }
                    style={ {
                      marginTop: 10
                    } }
                  />
                );
              })
            }
          </ScrollView>
          <Footer status={ order.status } completed={ completedGoods } onCancel={ this.goBackToList } onComplete={ this.goBackToList } />
        </Container>
      );
    } else if (!this.state.fetching && order.items) {
      return (
        <Container>
          <EmptyResult title="亲，该订单暂无采购信息！" />
          <Footer status={ order.status } completed={ completedGoods } onCancel={ this.goBackToList } onComplete={ this.goBackToList } disabled/>
        </Container>);
    } else {
      return null;
    }

  }

  fetchData = async () => {
    const { id } = this.props.navigation.state.params;
    const routeKey = this.props.navigation.state.key;

    try {
      let res: any = await APIs.order.getOrderInfo({
        u_id: id
      });

      if (this.state.fetching) {
        Toast.close();
        this.setState({
          fetching: false
        });
      }

      const results = res.data.results;

      Store.dispatch({
        type: Constants.ACTIONTYPES_NAVIGATION_SET_PARAMS,
        payload: {
          key: routeKey,
          params: {
            title: results.title,
            status: results.status
          }
        }
      });

      Store.dispatch({
        type: Constants.ACTIONTYPES_ORDER_UPDATE,
        meta: {
          storeKey: `${id}`
        },
        payload: results
      });

      if (results.status === OrderStatus.Working) {
        this.setState({
          completedGoods: this.calculateCompletedGoods(results.items)
        });
      }

    } catch (error) {

    }
  }

  calculateCompletedGoods(orderItems: any[]): number {
    let completedGoods = 0;

    if (orderItems.length) {
      for (let item of orderItems) {
        completedGoods += item.goods.filter((goods: any) => goods.completed).length;
      }
    }

    return completedGoods;
  }

  updateCompletedGoods = (num: number) => {
    this.setState({
      completedGoods: this.state.completedGoods + num
    });
  }

  goBackToList = () => {
    Navigator.back();
  }
}

export default OrderDetailScreen;