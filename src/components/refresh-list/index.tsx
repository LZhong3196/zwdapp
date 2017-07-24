import React, { PureComponent } from "react";
import { View, Text, StyleSheet, RefreshControl, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";

interface RefreshState {
    Idle: string;
    Refreshing: string;
    NoMoreData: string;
    Failure: string;
}

export const RefreshState: RefreshState = {
    Idle: "Idle",
    Refreshing: "Refreshing",
    NoMoreData: "NoMoreData",
    Failure: "Failure"
};

let debug = false;

class RefreshListView extends PureComponent<any, any> {
    private listRef: any;
    props: {
        onHeaderRefresh: any,
        onFooterRefresh: any,
        footerRefreshingText?: string,
        footerFailureText?: string,
        footerNoMoreDataText?: string,
        renderItem: any,
        data: any,
        key?: any,
        numColumns?: any,
    };

    state: {
        headerState: string,
        footerState: string,
    };

    static defaultProps = {
        footerRefreshingText: "数据加载中……",
        footerFailureText: "点击重新加载",
        footerNoMoreDataText: "已加载全部数据"
    };

    constructor(props: any) {
        super(props);

        this.state = {
            headerState: RefreshState.Idle,
            footerState: RefreshState.Idle,
        };
    }

    startHeaderRefreshing = () => {
        debug && console.log("startHeaderRefreshing");

        this.setState({ headerState: RefreshState.Refreshing });

        if (this.props.onHeaderRefresh) {
            this.props.onHeaderRefresh();
        }
    }

    startFooterRefreshing = () => {
        debug && console.log("startFooterRefreshing");

        this.setState({ footerState: RefreshState.Refreshing });

        if (this.props.onFooterRefresh) {
            this.props.onFooterRefresh();
        }
    }

    shouldStartHeaderRefreshing = () => {
        debug && console.log("shouldStartHeaderRefreshing");

        if (this.state.headerState === RefreshState.Refreshing ||
            this.state.footerState === RefreshState.Refreshing) {
            return false;
        }

        return true;
    }

    shouldStartFooterRefreshing = () => {
        debug && console.log("shouldStartFooterRefreshing");

        if (this.state.headerState === RefreshState.Refreshing ||
            this.state.footerState === RefreshState.Refreshing) {
            return false;
        }
        if (this.state.footerState === RefreshState.Failure ||
            this.state.footerState === RefreshState.NoMoreData) {
            return false;
        }
        if (this.props.data.length === 0) {
            return false;
        }

        return true;
    }

    endRefreshing = (refreshState: string) => {
        debug && console.log("endRefreshing");

        if (refreshState === RefreshState.Refreshing) {
            return;
        }
        let footerState = refreshState;
        if (this.props.data.length === 0) {
            footerState = RefreshState.Idle;
        }

        this.setState({
            headerState: RefreshState.Idle,
            footerState: footerState
        });
    }

    headerState = () => {
        return this.state.headerState;
    }

    footerState = () => {
        return this.state.footerState;
    }

    onHeaderRefresh = () => {
        if (this.shouldStartHeaderRefreshing()) {
            this.startHeaderRefreshing();
        }
    }

    onEndReached = (info: any) => {
        debug && console.log("onEndReached   " + info.distanceFromEnd);

        if (this.shouldStartFooterRefreshing()) {
            this.startFooterRefreshing();
        }
    }

    render() {
        return (
            <FlatList
                { ...this.props }
                onEndReachedThreshold={0.3}
                onEndReached={ (info: any) => this.onEndReached(info) }
                onRefresh={ this.onHeaderRefresh }
                refreshing={ this.state.headerState === RefreshState.Refreshing }
                ListFooterComponent={ this.renderFooter }
                showsVerticalScrollIndicator={ false }
                removeClippedSubviews={ false }
                ref={ (ref: any) => { this.listRef = ref; } }
            />
        );
    }

    scrollToTop = () => {
        this.listRef.scrollToOffset({ y: 0 });
    }

    renderFooter = () => {
        let footer = null;

        switch (this.state.footerState) {
            case RefreshState.Idle:
                <TouchableOpacity
                    style={styles.footerContainer}
                >
                </TouchableOpacity>;
                break;
            case RefreshState.Failure: {
                footer =
                    <TouchableOpacity
                        style={styles.footerContainer}
                        onPress={() => this.startFooterRefreshing()}
                    >
                        <Text style={styles.footerText}>
                            {this.props.footerFailureText}
                        </Text>
                    </TouchableOpacity>;
                break;
            }
            case RefreshState.Refreshing: {
                footer =
                    <View style={styles.footerContainer} >
                        <ActivityIndicator size="small" color="#888888" />
                        <Text style={[styles.footerText, { marginLeft: 7 }]}>
                            {this.props.footerRefreshingText}
                        </Text>
                    </View>;
                break;
            }
            case RefreshState.NoMoreData: {
                footer =
                    <View style={styles.footerContainer} >
                        <Text style={styles.footerText}>
                            {this.props.footerNoMoreDataText}
                        </Text>
                    </View>;
                break;
            }
        }

        return footer;
    }

}

// define your styles
const styles = StyleSheet.create({
    footerContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        height: 44,
    },
    footerText: {
        fontSize: 14,
        color: "#555555"
    }
});

export default RefreshListView;