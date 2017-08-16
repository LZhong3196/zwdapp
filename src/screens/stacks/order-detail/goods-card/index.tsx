import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
  Text
} from 'react-native';
import GoodsItem from '../goods-item';
import CollapsiblePanel from '../../../../components/collapsible-panel';
import { Widgets } from 'summer';

let { theme } = Widgets;

interface GoodsCardProps {
  goods: any,
  shop: string,
  style?: ViewStyle
}

class GoodsCard extends Component<GoodsCardProps, any> {
  render() {
    const { goods, shop, style } = this.props;

    return (
      <View style={ style }>
        <CollapsiblePanel title={ shop } >
          {
            goods.map((item: any, index: number) => {
              return (
                <GoodsItem
                  key={ index }
                  id={ item.u_id }
                  title={ item.title }
                  thumbnail={ item.thumbnail }
                  color={ item.color }
                  size={ item.size }
                  num={ item.num }
                  price={ item.price }
                  completed={ item.completed }
                />
              )
            })
          }
        </CollapsiblePanel>
        <View style={ styles.footer }>
          <View style={ styles.infoGroup }>
            <Text>共计<Text style={ styles.highlightText }>{ goods.length }</Text>款</Text>
          </View>
          <View style={ styles.infoGroup }>
            <Text>已采购<Text style={ styles.highlightText }>{ this.calculateCompletedGoods() }</Text>款</Text>
          </View>
          <View style={ styles.infoGroup }>
            <Text>应付：<Text style={ styles.highlightText }>￥{ this.calculateShouldPay().toFixed(2) }</Text></Text>
          </View>
        </View>
      </View>
    );
  }

  calculateShouldPay(): number {
    const { goods } = this.props;

    let shouldPay: number;
    if (goods.length == 1) {
      shouldPay = goods[0].price * goods[0].num;
    } else {
      shouldPay = goods.reduce((prev: any, next: any) => {
        if (typeof prev === 'number') {
          return prev + (next.price * next.num)
        } else {
          return (prev.price * prev.num) + (next.price * next.num)
        }
      })
    }
    return shouldPay
  }

  calculateCompletedGoods(): number {
    const { goods } = this.props
    return goods.filter((item: any) => item.completed).length
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 48,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderBottomWidth: theme.border_width_sm,
    borderColor: theme.color_grey,
    flexDirection: 'row',
  },
  highlightText: {
    color: theme.color_theme
  },
  infoGroup: {
    marginRight: 15,
    flex: 0,
    justifyContent: 'center'
  }
})

export default GoodsCard;