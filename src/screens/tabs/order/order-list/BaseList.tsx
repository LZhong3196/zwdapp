import React, { Component } from "react";
import {
  ListItem,
  Body,
  Right,
  Text,
  Icon
} from "native-base";
import RefreshList, { RefreshState } from "../../../../components/refresh-list";
import { APIs, Store, Constants, Widgets, Navigator, Routes } from "summer";
import EmptyResult from "../../../../components/empty-result";

let { theme, Toast } = Widgets;

interface OrderStatus {
  Working: number;
  Finished: number;
  Cancel: number;
}

export const OrderStatus: OrderStatus = {
  Working: 0,
  Finished: 1,
  Cancel: 2
};

export const StoreKeyMap: Map<number, string> = new Map([[OrderStatus.Working, "workingList"], [OrderStatus.Finished, "finishedList"], [OrderStatus.Cancel, "cancelList"]]);

interface OrderListProps {
  status?: number;
}

class BaseList extends Component<OrderListProps, any> {
  private flatList: any;

  static defaultProps = {
    status: 0
  };

  constructor(props: any, context: any) {
    super(props, context);

    this.state = {
      fetching: true
    };
  }

  componentDidMount() {
    this.fetchInitList();
  }

  render() {
    if (this.state.fetching) {
      return null;
    }

    const { status } = this.props;
    const data: any = Store.get(`order.${StoreKeyMap.get(status)}`) || [];

    if (!this.state.fetching && data.length === 0) {
      return (
        <EmptyResult title="亲，这里什么都没有哦！" subTitle="快去添加采购单吧。" />
      );
    } else {

      return (
        <RefreshList
          ref={ (e) => this.flatList = e
          }
          data={ data }
          renderItem={ this.renderRow }
          onHeaderRefresh={ () => this.fetchList(true)
          }
          onFooterRefresh={ () => this.fetchList(false) }
        />
      );
    }
  }

  private renderRow = (info: any) => {
    const item = info.item;
    return (
      <ListItem onPress={ () => this.goToDetail(item.u_id) }>
        <Body>
          <Text numberOfLines={ 1 }>[{ item.city }] { item.title }</Text>
        </Body>
        <Right style={ {
          flexDirection: "row",
          alignItems: "center",
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
      </ListItem >
    );
  }

  goToDetail = (id: string) => {
    Navigator.to(Routes.ROUTES_ORDER_DETAIL, { id });
  }

  fetchInitList = async () => {
    const { status } = this.props;

    Toast.loading({
      duration: -1
    });

    try {
      const response: any = await APIs.order.getOrderList({
        block_info: {
          index: 1,
        },
        status: status
      });

      Store.dispatch({
        type: Constants.ACTIONTYPES_ORDER_UPDATE,
        meta: {
          storeKey: StoreKeyMap.get(status).toString()
        },
        payload: response.data.results
      });

      if (this.state.fetching) {
        Toast.close();
        this.setState({
          fetching: false
        });
      }
    } catch (error) {

    }

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
        this.flatList.endRefreshing(RefreshState.NoMoreData);
        return;
      }

      let oldList: any = Store.get(`order.${StoreKeyMap.get(status)}`) || [];
      let newList: any = [];
      if (isRefresh) {
        newList = response.data.results;
      } else {
        newList = [...oldList, ...response.data.results];
      }

      Store.dispatch({
        type: Constants.ACTIONTYPES_ORDER_UPDATE,
        meta: {
          storeKey: StoreKeyMap.get(status).toString()
        },
        payload: newList
      });

      this.flatList.endRefreshing(RefreshState.Idle);

    } catch (error) {

    }
  }

}

export default BaseList;