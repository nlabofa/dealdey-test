import React, { Component } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import DealCard from "../components/DealCard";
import { ProgressBar } from "../components/common/index";
import { Actions } from "react-native-router-flux";
import HeaderComponent from "../components/Header";
import shoppingcartImage from "../assets/img/shopping-cart.png";
import Icon from "react-native-vector-icons/Ionicons";
console.disableYellowBox = true;

class HomeScreen extends Component {
  state = {
    page: 1,
    dealsdata: null
  };
  componentDidMount() {
    this.props.createCart();
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
      <HeaderComponent
        leftContent={this.leftContent}
        rightContent={this.rightContent}
        rightClick={() => Actions.push("cartlist")}
      />
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
  fetchDetails = (id, fetchVar) => {
    if (fetchVar === 0) {
      //variants_have_same_price is 0 i.e variants does not have same price hence we want to fetch the variant id seperately
      this.props.getDealVariant(id);
      this.props.FetchDealsDetails(id);
      return;
    } else {
      this.props.FetchDealsDetails(id);
    }
  };
  render() {
    const { container, progressBar, headercompview, cartNo } = styles;
    const { cartdetail } = this.props;
    let dealsdata = null;
    this.leftContent = <Text />;
    this.rightContent = (
      <View style={headercompview}>
        <Image source={shoppingcartImage} style={{ width: 30, height: 30 }} />
        {cartdetail !== null && cartdetail.cart.cart_items_count ? (
          <View style={cartNo}>
            <Text style={{ padding: 5, textAlign: "center", color: "white" }}>
              {cartdetail.cart.cart_items_count}
            </Text>
          </View>
        ) : null}
      </View>
    );
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
                fetchDetails={() =>
                  this.fetchDetails(
                    item.id,
                    item.least_priced_variant.variants_have_same_price
                  )
                }
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
  },
  headercompview: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  },
  cartNo: {
    position: "absolute",
    top: -10,
    left: -29,
    borderRadius: 50,
    width: 30,
    backgroundColor: "#bd2a2a"
  }
});
const mapStateToprops = state => {
  return {
    dealsdata: state.cart.deals,
    moredealsdata: state.cart.moredeals,
    cartdetail: state.cart.cartdetail,
    largeloading: state.ui.largeloading,
    loadingmoredeals: state.ui.loadingmoredeals
  };
};
const mapDispatchToProps = dispatch => {
  return {
    InitDeals: () => dispatch(actions.InitDeals()),
    createCart: () => dispatch(actions.createCart()),
    LoadMoreDeals: page => dispatch(actions.LoadMoreDeals(page)),
    FetchDealsDetails: id => dispatch(actions.FetchDealsDetais(id)),
    getDealVariant: id => dispatch(actions.getDealVariant(id))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(HomeScreen);
