import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar
} from "react-native";
import { Decorators, Store, Routes, Widgets } from "summer";
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Icon as BaseIcon,
  Thumbnail,
  Button,
  Footer,
  FooterTab
} from "native-base";

import styles from "./style";

let { Icon } = Widgets;

class ShopProfileScreen extends Component<any, any> {
  static navigationOptions = {
    title: "档口简介",
    headerStyle: {
      backgroundColor: "#fff"
    }
  };

  render() {
    const id: string = this.props.navigation.state.params.id;
    const shop: any = Store.get(`market.shop.${id}`) || {};

    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Content>
          <View style={ [styles.listGroup, styles.summaryGroup] }>
            <Thumbnail source={ { uri: shop.avatar } } square />
            <View style={ styles.summaryContent }>
              <Text style={ styles.shopTitle }>{ shop.title }</Text>
              <View style={ styles.tagGroup }>
                {
                  shop.tags.map((item: any) => {
                    return (<View style={ styles.tag } key={ item }>
                      <Text style={ styles.tagText }>{ item }</Text>
                    </View>);
                  })
                }
              </View>
            </View>
            { this.renderFavStatus(shop.fav) }
          </View>
          <List style={ styles.listGroup }>
            <ListItem itemHeader first>
              <Text>档口信息</Text>
            </ListItem>
            <ListItem>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>地区</Text>
                <Text style={ styles.itemContent }>{ shop.area }</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>商城</Text>
                <Text style={ styles.itemContent }>{ shop.address }</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>主营</Text>
                <Text style={ styles.itemContent }>{ shop.main }</Text>
              </Body>
            </ListItem>
            <ListItem last>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>服务</Text>
                <Text style={ styles.itemContent }>
                  <Text >{ shop.service.join(" ") }</Text>
                </Text>
              </Body>
            </ListItem>
          </List>
          <List style={ styles.listGroup }>
            <ListItem itemHeader first>
              <Text>联系方式</Text>
            </ListItem>
            <ListItem>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>QQ</Text>
                <Text style={ styles.itemContent }>{ shop.qq }</Text>
                <Right><Icon type="&#xe60c;" /></Right>
              </Body>
            </ListItem>
            <ListItem>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>旺旺</Text>
                <Text style={ styles.itemContent }>{ shop.taobao_account }</Text>
              </Body>
              <Right><Icon type="&#xe696;" color="#4285f4" /></Right>
            </ListItem>
            <ListItem>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>手机</Text>
                <Text style={ styles.itemContent }>{ shop.contact }</Text>
                <Right><Icon type="&#xe637;" color="#34a853" /></Right>
              </Body>
            </ListItem>
            <ListItem last>
              <Body style={ styles.itemLeft }>
                <Text style={ styles.itemName }>地址</Text>
                <Text style={ styles.itemContent }>{ shop.address }</Text>
                <Right><Icon type="&#xe65e;" color="#fbbc05" /></Right>
              </Body>
            </ListItem>
          </List>
          <List style={ { ...styles.listGroup, ...styles.listGroupLast } }>
            <ListItem first last>
              <Body>
                <Text style={ { ...styles.itemName, ...styles.highlight } }>档口名片</Text>
              </Body>
              <Right>
                <BaseIcon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
        <Footer style={ styles.footer }>
          <FooterTab>
            <Button style={ styles.footerBtn }>
              <Text style={ styles.footerBtnText }>进入淘宝店</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

  renderFavStatus(isFav: boolean) {
    let btnStyle;
    let btnText;

    if (isFav) {
      btnStyle = { ...styles.btnFavBase, ...styles.btnFav };
      btnText = "已关注";
    } else {
      btnStyle = { ...styles.btnFavBase, ...styles.btnUnFav };
      btnText = "未关注";
    }

    return (
      <Button style={ btnStyle } disabled>
        <Icon type="&#xe600;" size={ 14 } color="#fff" />
        <Text style={ styles.btnFavText }>
          { btnText }
        </Text>
      </Button>
    );
  }

}

export default ShopProfileScreen;