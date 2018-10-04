import React, { Component } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import DealCard from "../components/DealCard";
import { ProgressBar, Header } from "../components/common/index";
import Icon from "react-native-vector-icons/Ionicons";
console.disableYellowBox = true;

class HomeScreen extends Component {
  state = {
    page: 1,
    dealsdata: null
  };
  componentDidMount() {
    this.props.InitDeals();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dealsdata !== null) {
      this.setState({ dealsdata: nextProps.dealsdata });
    }
    if (
      nextProps.moredealsdata !== null &&
      nextProps.moredealsdata !== this.props.moredealsdata
    ) {
      this.setState({
        dealsdata: [...this.state.dealsdata, ...nextProps.moredealsdata]
      });
    }
  }
  renderHeader = () => {
    return (
      <Header leftContent={this.leftContent} rightContent={this.rightContent} />
    );
  };
  renderFooter = () => {
    if (this.props.largeloading) return null;

    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
      >
        <ProgressBar sizeL="large" />
      </View>
    );
  };
  handleLoadMore = () => {
    console.log("end reached..loading more..");
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.props.LoadMoreDeals(this.state.page);
      }
    );
  };
  handleRefresh = () => {
    this.props.InitDeals();
  };
  render() {
    const { container, progressBar } = styles;
    let dealsdata = null;
    this.leftContent = <Text />;
    this.rightContent = <Icon name="ios-cart" size={30} />;
    /*if (this.props.dealsdata !== null) {
      dealsdata = this.props.dealsdata.deals.map(item =>
        console.log(item.short_title)
      );
    }*/
    if (this.state.dealsdata !== null) {
      dealsdata = this.state.dealsdata;
    }
    return this.props.largeloading ? (
      <View style={progressBar}>
        <ProgressBar sizeL="large" />
      </View>
    ) : (
      <View style={container}>
        <View style={{ width: "100%" /*backgroundColor: "red"*/ }}>
          <FlatList
            numColumns={2}
            data={dealsdata}
            renderItem={({ item }) => (
              <DealCard
                key={item.id}
                img={item.image}
                title={item.short_title}
                listPrice={item.least_priced_variant.list_price}
                discountedPrice={item.least_priced_variant.discounted_price}
                location={item.hover_location}
              />
            )}
            keyExtractor={item => item.id}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            refreshing={this.props.largeloading}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0.1}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: "2%"
  },
  progressBar: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
const mapStateToprops = state => {
  return {
    dealsdata: state.cart.deals,
    moredealsdata: state.cart.moredeals,
    largeloading: state.ui.largeloading,
    loadingmoredeals: state.ui.loadingmoredeals
  };
};
const mapDispatchToProps = dispatch => {
  return {
    InitDeals: () => dispatch(actions.InitDeals()),
    LoadMoreDeals: page => dispatch(actions.LoadMoreDeals(page))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(HomeScreen);
