import React, { Component, ReactElement } from "react";

import PopoverBase, { Rect } from "./popover-base";

class Popover extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      isVisible: false,
      fromRect: null,
      content: null
    };
  }

  static instance: any;

  /**
   * @param fromRect 触发popover的组件信息，{pageX:,pageY,width,height}
   * @param content 需要在popover展示的内容
   */
  static show(fromRect: Rect, content: ReactElement<any>) {
    this.instance._show(fromRect, content);
  }

  static hide() {
    this.instance._hide();
  }

  _show(fromRect: Rect, content: ReactElement<any>) {
    this.setState({
      isVisible: true,
      fromRect,
      content
    });
  }

  _hide = () => {
    this.setState({
      isVisible: false
    });
  }

  render() {
    return (
      <PopoverBase
        isVisible={ this.state.isVisible }
        fromRect={ this.state.fromRect }
        onClose={ this._hide }
      >
        { this.state.content }
      </PopoverBase>
    );
  }
}

export default Popover;