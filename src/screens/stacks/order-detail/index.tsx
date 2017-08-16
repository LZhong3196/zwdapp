import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { APIs, Store, Constants, Decorators } from 'summer';
import CollapsiblePanel from '../../../components/collapsible-panel';
import GoodsCard from './goods-card';

class OrderDetailScreen extends Component<any, any> {
  componentDidMount() {
    this.fetchData()
  }

  render() {
    const { id } = this.props.navigation.state.params;
    let order: any[] = Store.get(`order.${id}`) || []

    return (
      <ScrollView>
        {
          order.map((item) => {
            return (
              <GoodsCard
                key={ item.shop_id }
                shop={ item.shop_name }
                goods={ item.goods }
                showPurchaseStatus={ true }
                style={ {
                  marginTop: 10
                } }
              />
            )
          })
        }
      </ScrollView>
    );
  }

  fetchData = async () => {
    const { id } = this.props.navigation.state.params;

    try {
      let res: any = await APIs.order.getOrderInfo({
        u_id: id
      })

      Store.dispatch({
        type: Constants.ACTIONTYPES_ORDER_UPDATE,
        meta: {
          storeKey: `${id}`
        },
        payload: res.data.results
      })

    } catch (error) {

    }
  }
}

export default OrderDetailScreen;