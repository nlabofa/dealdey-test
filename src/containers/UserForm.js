import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button, Input, ProgressBar } from "../components/common";
import HeaderComponent from "../components/Header";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
class UserForm extends Component {
  state = {
    firstname: "",
    mobile: "",
    email: ""
  };
  updatestate = val => {
    this.setState({ val });
  };
  render() {
    const {
      containerFill,
      container,
      normLText,
      viewStyle,
      progressBar,
      subDetail,
      bottomHeader
    } = styles;
    const { createUser, checkoutdetail, largeloading } = this.props;
    const { firstname, mobile, email } = this.state;
    this.leftContent = <Text style={normLText}>User Info</Text>;
    this.rightContent = <Text />;
    return largeloading ? (
      <View style={progressBar}>
        <ProgressBar sizeL="large" />
      </View>
    ) : (
      <View style={containerFill}>
        <HeaderComponent
          leftContent={this.leftContent}
          rightContent={this.rightContent}
        />
        <View style={container}>
          <Text style={[normLText, { textAlign: "center" }]}>
            Fill In Your Info To Proceed
          </Text>

          <View style={viewStyle}>
            <Input
              label="FirstName"
              placeholder="opeyemi"
              onChangeText={firstname => this.setState({ firstname })}
              //value={this.state.firstname}
            />
            <Input
              label="Mobile No."
              placeholder="08189798883"
              onChangeText={mobile => this.setState({ mobile })}
              // value={this.state.mobile}
            />
            <Input
              label="Email"
              placeholder="pezzy@gmail.com"
              onChangeText={email => this.setState({ email })}
              //value={this.state.email}
            />
            <View />
          </View>
        </View>
        <View style={bottomHeader}>
          <Button
            fullwidth
            onPress={() =>
              createUser(
                checkoutdetail.cart.id,
                checkoutdetail.is_shippable,
                checkoutdetail.total_amount,
                firstname,
                mobile,
                email
              )
            }
            color="#e25902"
          >
            continue
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFill: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    position: "relative"
  },
  container: {
    paddingHorizontal: "2%"
  },
  progressBar: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewStyle: {
    width: "100%",
    minHeight: 150,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative"
  },
  normLText: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
    textTransform: "uppercase"
  },

  bottomHeader: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "absolute",
    bottom: 0,
    height: 70,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%"
  }
});

const mapStateToprops = state => {
  return {
    largeloading: state.ui.largeloading,
    checkoutdetail: state.cart.checkoutdetail
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //deal_id, variant_id, quantity
    createUser: (
      cart_id,
      is_shippable,
      total_amount,
      firstname,
      mobile,
      email
    ) =>
      dispatch(
        actions.createUserInfo(
          cart_id,
          is_shippable,
          total_amount,
          firstname,
          mobile,
          email
        )
      )
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(UserForm);
