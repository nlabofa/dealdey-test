import React, { Component } from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import DealCard from "../components/DealCard";
import { ProgressBar } from "../components/common/index";
class HomeScreen extends Component {
  componentDidMount() {
    this.props.InitDeals();
  }

  render() {
    const { container, progressBar } = styles;
    let dealsdata = null;
    /*if (this.props.dealsdata !== null) {
      dealsdata = this.props.dealsdata.deals.map(item =>
        console.log(item.short_title)
      );
    }*/
    if (this.props.dealsdata !== null) {
      dealsdata = this.props.dealsdata.deals;
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
                img={item.image}
                title={item.short_title}
                listPrice={item.least_priced_variant.list_price}
                discountedPrice={item.least_priced_variant.discounted_price}
                location={item.hover_location}
              />
            )}
            keyExtractor={item => item.id}
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
    largeloading: state.ui.largeloading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    InitDeals: () => dispatch(actions.InitDeals())
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(HomeScreen);
