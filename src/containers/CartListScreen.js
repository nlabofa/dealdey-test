import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  ScrollView
} from "react-native";
import testImage from "../assets/img/flix.png";
import HeaderComponent from "../components/Header";
import ListCard from "../components/ListCard";
import { Button } from "../components/common";
import { Actions } from "react-native-router-flux";
import shoppingcartImage from "../assets/img/shopping-cart.png";

class CartListScreen extends Component {
  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      />
    );
  };
  render() {
    const {
      container,
      containerFill,
      priceText,
      normText,
      normLText,
      bottomHeader,
      underlineText,
      subTotalView
    } = styles;
    const { cartdetail } = this.props;
    this.leftContent = (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Image source={shoppingcartImage} style={{ width: 30, height: 30 }} />
        <Text style={[normText, { paddingLeft: 10 }]}>Cart</Text>
      </View>
    );
    this.rightContent = <Text style={underlineText}>continue shopping</Text>;
    return (
      <View style={containerFill}>
        <HeaderComponent
          leftContent={this.leftContent}
          rightContent={this.rightContent}
          rightClick={() => Actions.popTo("homescreen")}
        />
        <ScrollView style={container}>
          <FlatList
            data={cartdetail.cart.cart_items}
            renderItem={({ item }) => (
              <ListCard
                key={item.id}
                img={item.image_for_cart}
                quantity={item.quantity}
                title={item.deal.short_title}
                listPrice={item.unit_price}
              />
            )}
            keyExtractor={item => item.deal.short_title}
            ListFooterComponent={this.renderFooter}
          />
        </ScrollView>

        <View style={bottomHeader}>
          <View style={subTotalView}>
            <Text style={normLText}>SUB TOTAL</Text>
            <Text style={priceText}>
              {"  N" + " " + cartdetail.cart.cart_sub_total}
            </Text>
          </View>
          <Button fullwidth color="#e25902">
            proceed to checkout
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
  normText: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    textTransform: "uppercase"
  },
  normLText: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
    textTransform: "uppercase"
  },
  underlineText: {
    color: "black",
    fontWeight: "500",
    fontSize: 18,
    textDecorationLine: "underline"
  },
  subTotalView: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  priceText: {
    color: "#29a981",
    fontSize: 18,
    fontWeight: "bold"
  },
  bottomHeader: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "absolute",
    bottom: 0,
    minHeight: 90,
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%"
  }
});

export default CartListScreen;
