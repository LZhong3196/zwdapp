import React, { Component } from 'react';

import { Decorators } from 'summer';
import BaseList, { OrderStatus } from './BaseList';

@Decorators.connect('order.cancelList')
class WorkingList extends Component {
  render() {
    return (
      <BaseList status={ OrderStatus.Cancel } />
    );
  }
}

export default WorkingList;