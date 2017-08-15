import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image
} from 'react-native';
import { Button } from 'native-base';
import { Widgets } from 'summer';

let { theme } = Widgets;

interface GoodsItemProps {
  id: string,
  title: string,
  color: string,
  size: string,
  num: number,
  price: number,
  thumbnail: string,
  completed: boolean,
  onConfirmedPurchase?: any
}

class GoodsItem extends Component<GoodsItemProps, any> {
  render() {
    const { title, color, size, num, price, thumbnail } = this.props;
    return (
      <TouchableHighlight>
        <View style={ styles.container }>
          <Image source={ { uri: thumbnail } } style={ styles.thumbnail } />
          <View style={ styles.infoContainer }>
            <Text numberOfLines={ 2 }>{ title }</Text>
            <View style={ styles.infoItem }>
              <Text style={ [styles.infoLeft, styles.colorGrey] }>颜色：{ color }</Text>
              <Text style={ styles.colorGrey }>x { num }</Text>
            </View>
            <View style={ styles.infoItem }>
              <Text style={ [styles.infoLeft, styles.colorGrey] }>尺寸：{ size }</Text>
              <Button bordered style={ {
                paddingRight: 6,
                paddingLeft: 6,
                height: 20,
                borderColor: theme.color_grey
              } }>
                <Text style={ styles.btnConfirmPurchaseText }>确认收货</Text>
              </Button>
            </View>
            <Text style={ styles.price }>￥{ price }</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: theme.border_width_sm,
    borderBottomColor: theme.color_grey,
    flexDirection: 'row'
  },

  title: {
    fontSize: theme.font_size_caption_sm,
    color: theme.color_base
  },

  thumbnail: {
    width: 100,
    height: 100
  },

  infoContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "space-between"
  },

  infoItem: {
    flexDirection: 'row',
    alignItems: 'center'
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
    color: theme.color_grey,
    fontSize: 12
  }
})

export default GoodsItem;