import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Button } from "../components/common/index";
import HeaderComponent from "../components/Header";
import { Actions } from "react-native-router-flux";
class CheckOutScreen extends Component {
  render() {
    const {
      normText,
      detailButton,
      detailText,
      containerFill,
      container,
      normLText,
      viewStyle,
      subDetail,
      bottomHeader
    } = styles;
    const { checkoutdetail } = this.props;

    this.leftContent = <Text style={normLText}>ORDER SUMMARY</Text>;
    this.rightContent = (
      <View style={detailButton}>
        <Text style={detailText}>View detail</Text>
      </View>
    );
    return (
      <View style={containerFill}>
        <HeaderComponent
          leftContent={this.leftContent}
          rightContent={this.rightContent}
        />
        <View style={container}>
          <View style={viewStyle}>
            <View style={subDetail}>
              <Text style={normText}>SUB TOTAL</Text>
              <Text style={normText}>TOTAL</Text>
            </View>
            <View style={subDetail}>
              <Text style={normLText}>{"N " + checkoutdetail.sub_total}</Text>
              <Text style={normLText}>
                {"N " + checkoutdetail.total_amount}
              </Text>
            </View>
          </View>
        </View>
        <View style={bottomHeader}>
          <Button
            fullwidth
            onPress={() => Actions.push("userform")}
            color="#e25902"
          >
            complete order
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
    paddingHorizontal: "5%"
  },
  viewStyle: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    //alignItems: "center",
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative"
  },
  subDetail: {
    flexDirection: "column",
    justifyContent: "space-around"
  },
  normText: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    textTransform: "uppercase"
  },
  detailText: {
    color: "#d0d0d0",
    fontWeight: "bold",
    fontSize: 14,
    textTransform: "uppercase"
  },
  detailButton: {
    borderColor: "#d0d0d0",
    borderWidth: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center"
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
export default CheckOutScreen;
