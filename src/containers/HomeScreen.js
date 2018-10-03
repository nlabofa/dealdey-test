import React, { Component } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
class HomeScreen extends Component {
  componentDidMount() {
    this.props.InitDeals();
  }
  render() {
    let dealsdata = null;
    if (this.props.dealsdata !== null) {
      dealsdata = this.props.dealsdata.deals.map(item =>
        console.log(item.short_title)
      );
    }
    return (
      <View>
        <Text style={{ paddingTop: 15, fontSize: 20 }}>Hello you</Text>
        {dealsdata}
      </View>
    );
  }
}
const mapStateToprops = state => {
  return {
    dealsdata: state.cart.deals
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
