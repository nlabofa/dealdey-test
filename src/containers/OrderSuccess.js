import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import { Button } from "../components/common";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
class OrderSuccess extends Component {
  render() {
    const {
      normText,
      headerStyle,
      containerFill,
      container,
      normLText,
      ItemView,
      cartTotalView,
      cartItem,
      bottomHeader
    } = styles;
    const { orderdetail } = this.props;
    let ItemDeals = null;
    if (orderdetail.line_items !== null) {
      ItemDeals = orderdetail.line_items.map(item => (
        <View style={ItemView} key={item.deal.sku_number}>
          <Text style={normText}>
            {item.deal.short_title + `(${item.quantity})`}
          </Text>
          <Text style={normLText}>{item.price}</Text>
        </View>
      ));
    }

    return (
      <View style={containerFill}>
        <View style={headerStyle}>
          <Icon name="md-checkmark" size={30} style={{ paddingRight: 10 }} />
          <Text style={normLText}>Successful Order</Text>
        </View>
        <View style={container}>
          {ItemDeals}
          <View style={cartTotalView}>
            <View style={cartItem}>
              <Text style={normText}>SUB TOTAL</Text>
              <Text style={normLText}>{"N " + orderdetail.sub_total}</Text>
            </View>
            <View style={cartItem}>
              <Text style={normText}>SHIPPING</Text>
              <Text style={normLText}>
                {orderdetail.shipping_charges === null
                  ? "---"
                  : "N " + orderdetail.shipping_charges}
              </Text>
            </View>
            <View style={cartItem}>
              <Text style={normText}>TOTAL</Text>
              <Text style={normLText}>{"N " + orderdetail.total_price}</Text>
            </View>
          </View>
        </View>

        <View style={bottomHeader}>
          <Button
            fullwidth
            onPress={() => Actions.push("homescreen")}
            color="#e25902"
          >
            Go Home
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
  ItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#e8e8e8",
    paddingHorizontal: "5%"
    //backgroundColor: "red"
  },
  cartTotalView: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    height: 150,
    marginTop: 30,
    backgroundColor: "#e8e8e8",
    paddingHorizontal: "5%"
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%"
  },
  headerStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    marginTop: 25,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative"
  },
  normText: {
    color: "black",
    fontSize: 18,
    color: "#666666"
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
export default OrderSuccess;
