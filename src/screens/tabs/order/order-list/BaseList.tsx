import React, { Component } from 'react';
import {
  ListItem,
  Body,
  Right,
  Text,
  Icon
} from 'native-base';
import RefreshList, { RefreshState } from '../../../../components/refresh-list';
import { APIs, Store, Constants, Widgets } from 'summer';

let { theme } = Widgets;

interface OrderStatus {
  Working: number,
  Finished: number,
  Cancel: number
}

export const OrderStatus: OrderStatus = {
  Working: 0,
  Finished: 1,
  Cancel: 2
}

let storeKeyMap: Map<number, string> = new Map();
storeKeyMap.set(OrderStatus.Working, 'workingList');
storeKeyMap.set(OrderStatus.Finished, 'finishedList');
storeKeyMap.set(OrderStatus.Cancel, 'cancelList')

interface OrderListProps {
  status?: number
}

class BaseList extends Component<OrderListProps, any> {
  private flatList: any;

  static defaultProps: {
    status: 0
  }

  constructor(props: any) {
    super(props);

    this.state = {
      loading: false
    }
  }

  private renderRow(info: any) {
    const item = info.item
    return (
      <ListItem>
        <Body>
          <Text numberOfLines={ 1 }>[{ item.city }] { item.title }</Text>
        </Body>
        <Right style={ {
          flexDirection: 'row',
          alignItems: 'center',
          flex: 0
        } }>
          <Text
            style={ {
              paddingRight: 10,
              color: theme.color_grey
            } }
          >已完成<Text style={ {
            color: theme.color_theme
          } }>{ item.completed }</Text>款</Text>
          <Icon name="arrow-forward"></Icon>
        </Right>
      </ListItem>
    )
  }

  componentDidMount() {
    this.flatList.startHeaderRefreshing();
  }

  render() {
    const { status } = this.props;
    const data: any = Store.get(`order.${storeKeyMap.get(status)}`) || [];

    return (
      <RefreshList
        ref={ (e) => this.flatList = e }
        data={ data }
        renderItem={ this.renderRow }
        onHeaderRefresh={ () => this.fetchList(true) }
        onFooterRefresh={ () => this.fetchList(false) }
      />
    );
  }

  fetchList = async (isRefresh: boolean) => {
    const { status } = this.props;

    let blockIndex = isRefresh ? 1 : 0;

    try {
      const response: any = await APIs.order.getOrderList({
        block_info: {
          index: blockIndex,
        },
        status: status
      });

      if (!response.data.results.length) {
        this.flatList.endRefreshing(RefreshState.NoMoreData)
        return;
      }

      let oldList: any = Store.get(`order.${storeKeyMap.get(status)}`) || [];
      let newList: any = [];
      if (isRefresh) {
        newList = response.data.results;
      } else {
        newList = [...oldList, ...response.data.results];
      }

      Store.dispatch({
        type: Constants.ACTIONTYPES_ORDER_UPDATE,
        meta: {
          storeKey: storeKeyMap.get(status).toString()
        },
        payload: newList
      })

      this.flatList.endRefreshing(RefreshState.Idle)

    } catch (error) {

    }
  }

}

export default BaseList;