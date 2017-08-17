import React from 'react';
import { Text } from 'react-native';
import {
  Footer,
  FooterTab,
  Button
} from 'native-base';

import { OrderStatus } from '../../../tabs/order';
import WorkingFooter from './working-footer';
import NoActionFooter from './no-action-footer';


interface DetailFooterProps {
  status: number,
  completed: number,
  onCancel: () => void,
  onComplete: () => void
}

const DetailFooter: React.SFC<DetailFooterProps> = (props) => {
  const { status, completed, onCancel, onComplete } = props;

  switch (status) {
    case OrderStatus.Working:
      return <WorkingFooter completed={ completed } onCancel={ onCancel } onComplete={ onComplete } />
    case OrderStatus.Finished:
      return <NoActionFooter title="已完成" />
    case OrderStatus.Cancel:
      return <NoActionFooter title="已作废" />
    default:
      return null;
  }
};


export default DetailFooter;