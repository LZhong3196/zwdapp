import * as React from "react";
import { Widgets, APIs, Store, Constants } from "summer";
import DatePicker from "react-native-datepicker";

let { Toast, theme } = Widgets;

export interface PickerProps {
    value?: string;
}

export class Picker extends React.Component<any, any> {
    render() {
        return (
            <DatePicker
                style={{ width: 200 }}
                date={this.props.value}
                mode="date"
                showIcon={false}
                placeholder="请选择日期"
                format="YYYY-MM-DD"
                minDate="1990-01-01"
                maxDate="2017-06-01"
                confirmBtnText="确认"
                cancelBtnText="取消"
                customStyles={{
                    dateInput: {
                        borderWidth: 0,
                        alignItems: "flex-end"
                    },
                    dateText: {
                        color: theme.color_base
                    },
                    btnTextConfirm: {
                        color: theme.color_theme
                    }
                }}
                onDateChange={(value: string) => this.onSubmit(value) }
            />
        );
    }

    onSubmit = async (value: string) => {
        if (value === this.props.value) {
            return;
        }
        try {
            Toast.loading({
                maskHidden: true
            });
            const profile: any = Store.get("user.profile");
            let profileUpdate: any = {
                ...profile,
                birthday: value
            };
            let res: any = APIs.user.postUserInfo(profileUpdate);
            Store.update("user.profile", profileUpdate);
        }
        catch (e) {

        }
    }
}
