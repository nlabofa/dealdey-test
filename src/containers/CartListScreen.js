import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import testImage from "../assets/img/flix.png";
import HeaderComponent from "../components/Header";
import { Button } from "../components/common";
import shoppingcartImage from "../assets/img/shopping-cart.png";

class CartListScreen extends Component {
  render() {
    const {
      container,
      containerFill,
      sliderDiv,
      productName,
      dealInfo,
      amountView,
      strikeText,
      priceText,
      discountText,
      normText,
      bottomHeader
    } = styles;
    this.leftContent = <Text />;
    this.rightContent = (
      <Image source={shoppingcartImage} style={{ width: 30, height: 30 }} />
    );
    //const { dealdetail } = this.props;
    return (
      <View style={containerFill}>
        <HeaderComponent
          leftContent={this.leftContent}
          rightContent={this.rightContent}
        />
        <View style={container}>
          <View style={sliderDiv}>
            <Image
              source={testImage}
              style={{
                width: "90%",
                height: "100%"
              }}
              loadingIndicatorSource={testImage}
              defaultSource={testImage}
              resizeMode="cover"
            />
          </View>
          <Text style={productName}>text</Text>
        </View>
        <View style={dealInfo}>
          <View style={amountView}>
            <Text style={strikeText}>texr</Text>
            <Text style={priceText}>ffff</Text>
          </View>
          <View style={amountView}>
            <Text style={normText}>Discount</Text>
            <Text style={discountText}>trrt</Text>
          </View>
          <View style={amountView}>
            <Text style={normText}>You save</Text>
            <Text style={discountText}>gggg</Text>
          </View>
          <View style={amountView}>
            <Text style={normText}>sold</Text>
            <Text style={normText}>jghg</Text>
          </View>
        </View>
        <View style={bottomHeader}>
          <Button color="#e25902">Buy now</Button>
          <Button color="#d0d0d0">add to cart</Button>
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
  sliderDiv: {
    borderWidth: 1,
    borderColor: "transparent",
    flexDirection: "row",
    position: "relative",
    justifyContent: "center",
    width: "100%",
    height: 170
    //backgroundColor: "red"
  },
  productName: {
    color: "black",
    fontSize: 18,
    marginTop: 20,
    fontWeight: "500"
  },
  dealInfo: {
    backgroundColor: "#e8e8e8",
    height: 60,
    flexDirection: "row",
    paddingHorizontal: "5%",
    marginTop: 20,
    justifyContent: "space-between"
  },
  amountView: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  strikeText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "black",
    fontSize: 18
  },
  normText: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    textTransform: "uppercase"
  },
  priceText: {
    color: "#29a981",
    fontSize: 18,
    fontWeight: "bold"
  },
  discountText: {
    color: "#bd2a2a",
    fontWeight: "500",
    fontSize: 14,
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

export default CartListScreen;
