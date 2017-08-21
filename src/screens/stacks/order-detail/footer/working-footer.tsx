import React, { Component } from "react";
import { Text, Alert } from "react-native";
import {
  Footer,
  FooterTab,
  Button
} from "native-base";
import { Widgets, Decorators } from "summer";
let { theme } = Widgets;

interface WorkingFooterProps {
  completed: number;
  disabled?: boolean;
  onCancel: () => void;
  onComplete: () => void;
}

const commonStyle = {
  backgroundColor: "#fff",
  borderRadius: 0,
  borderTopColor: theme.color_grey,
  borderTopWidth: theme.border_width_sm,
};

@Decorators.pureRender()
class WorkingFooter extends Component<WorkingFooterProps, any> {

  render() {
    const { completed, disabled } = this.props;

    return (
      <Footer>
        <FooterTab>
          <Button style={ {
            ...commonStyle,
            borderRightWidth: theme.border_width_sm,
            borderColor: theme.color_grey
          } }>
            <Text style={ { color: theme.color_base } }>已采购<Text style={ { color: theme.color_theme } }>{ completed }</Text>款</Text>
          </Button >
          <Button style={ {
            ...commonStyle
          } }
            onPress={ this.onCancelClick }
          >
            <Text>作废</Text>
          </Button>
          <Button
            style={ {
              backgroundColor: disabled? theme.color_grey : theme.color_theme,
              borderRadius: 0
            } }
            disabled={ disabled }
            onPress={ this.onCompleteClick }
          >
            <Text style={ {
              color: "#fff"
            } }>完成</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }

  onCancelClick = () => {
    const { onCancel } = this.props;

    Alert.alert("确认要完成当前采购单吗？", null, [
      { text: "取消" },
      {
        text: "确定", onPress: () => {
          onCancel();
        }
      }
    ]);
  }

  onCompleteClick = () => {
    const { onComplete } = this.props;

    Alert.alert("确认要完成当前采购单吗？", null, [
      { text: "取消" },
      {
        text: "确定", onPress: () => {
          onComplete();
        }
      }
    ]);
  }
}

export default WorkingFooter;