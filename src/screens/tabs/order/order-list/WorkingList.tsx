import React, { Component } from 'react';

import { Decorators } from 'summer';
import BaseList, { OrderStatus } from './BaseList';

@Decorators.connect('order.workingList')
class WorkingList extends Component {
  render() {
    return (
      <BaseList status={ OrderStatus.Working } />
    );
  }
}

export default WorkingList;
