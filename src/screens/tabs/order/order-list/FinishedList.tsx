import React, { Component } from "react";

import { Decorators } from "summer";
import BaseList, { OrderStatus } from "./BaseList";

@Decorators.connect("order.finishedList")
class WorkingList extends Component {
  render() {
    return (
      <BaseList status={ OrderStatus.Finished } />
    );
  }
}

export default WorkingList;