import React from 'react';
import { View, Text } from 'react-native';
import {
  Footer,
  FooterTab,
  Button
} from 'native-base';
import { Widgets } from 'summer';

let { theme } = Widgets;

interface NoActionFooterProps {
  title: string
}

const NoActionFooter: React.SFC<NoActionFooterProps> = (props) => {

  const { title } = props;
  return (
    <Footer>
      <FooterTab style={ {
        backgroundColor: '#fff',
        borderTopColor: theme.color_grey,
        justifyContent: 'center',
        alignItems: 'center'
      } }>
        <View>
          <Text>{ title }</Text>
        </View>
      </FooterTab>
    </Footer>
  );
};

export default NoActionFooter;