import React, { PureComponent } from "react";
import {
  View,
  TouchableHighlight,
  Dimensions,
  Text,
  ScrollView
} from "react-native";
import {
  List,
  ListItem,
  Icon,
  Right
} from "native-base";

import styles from "./style";
import CollapsiblePanel from "../../../../components/collapsible-panel";

export interface CategoryListProps {
  categories: any[];
  onItemPress: (id?: string) => void;
}

class CategoryList extends PureComponent<CategoryListProps, any> {
  render() {
    const { categories, onItemPress } = this.props;

    return (
      <View style={ styles.container }>
        <List>
          <ListItem style={ styles.header } onPress={ onItemPress }>
            <Text style={ styles.headerText }>全部分类</Text>
            <Right><Icon name="arrow-forward"></Icon></Right>
          </ListItem>
        </List>
        <View style={ { flex: 1 } }>
          <ScrollView>
            <List>
              {
                categories && categories.map((item) => {
                  if (item.children.length) {
                    return (
                      <CollapsiblePanel
                        key={ item.u_id }
                        title={ item.title }
                        collapsed
                        titleStyle={ { fontSize: 12 } }
                        headerStyle={ { borderBottomWidth: 0, borderTopWidth: 0 } }
                      >
                        {
                          item.children.map((item: any) => {
                            return (
                              <ListItem
                                style={ styles.categoryItem }
                                key={ item.u_id }
                                onPress={ () => { onItemPress(item.u_id); } }
                              >
                                <Text style={ [styles.itemText, styles.childText] } numberOfLines={ 1 }>{ item.title }</Text>
                              </ListItem>
                            );
                          })
                        }
                      </CollapsiblePanel>
                    );
                  }

                  return (
                    <ListItem
                      style={ styles.categoryItem }
                      key={ item.u_id }
                      onPress={ () => { onItemPress(item.u_id); } }
                    >
                      <Text style={ styles.itemText } numberOfLines={ 1 }>{ item.title }</Text>
                    </ListItem>
                  );
                })
              }
            </List>
          </ScrollView>
        </View>
      </View >
    );
  }
}

export default CategoryList;