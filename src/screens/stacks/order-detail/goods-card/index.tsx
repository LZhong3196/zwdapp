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
    const goodsCompleted: number = goods.filter((item: any) => item.completed).length
    const shouldPay: number = goods.reduce((prev: any, next: any) => (prev.price * prev.num) + (next.price * next.num))

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
          <View>
            <Text style={ styles.infoGroup }>共计<Text style={ styles.highlightText }>{ goods.length }</Text>款</Text>
            <Text style={ styles.infoGroup }>已采购<Text style={ styles.highlightText }>{ goodsCompleted }</Text></Text>
            <Text style={ styles.infoGroup }>应付：<Text style={ styles.highlightText }>￥{ shouldPay }</Text></Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    height: 48,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  highlightText: {
    color: theme.color_theme
  },
  infoGroup: {
    marginLeft: 20,
    position: 'absolute'
  }
})

export default GoodsCard;