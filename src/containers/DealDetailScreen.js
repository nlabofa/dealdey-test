import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import testImage from "../assets/img/flix.png";
import HeaderComponent from "../components/Header";
import { Button, ProgressBar } from "../components/common/index";

import shoppingcartImage from "../assets/img/shopping-cart.png";

class DealDetailScreen extends Component {
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
      bottomHeader,
      progressBar,
      headercompview,
      cartNo
    } = styles;
    const {
      dealdetail,
      cartdetail,
      addItemToCart,
      largeloading,
      variantdetail
    } = this.props;
    this.leftContent = <Text />;
    this.rightContent = (
      <View style={headercompview}>
        <Image source={shoppingcartImage} style={{ width: 30, height: 30 }} />
        {cartdetail !== null && cartdetail.cart.cart_items_count !== null ? (
          <View style={cartNo}>
            <Text style={{ padding: 5, textAlign: "center", color: "white" }}>
              {cartdetail.cart.cart_items_count}
            </Text>
          </View>
        ) : null}
      </View>
    );

    const variant_id =
      dealdetail.variants_have_same_price == true
        ? dealdetail.master_variant_id
        : variantdetail.variants[0].id;
    const cart_id = cartdetail.cart.id;
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
          <View style={sliderDiv}>
            <Image
              source={{ uri: dealdetail.main_image }}
              style={{
                width: "90%",
                height: "100%"
              }}
              loadingIndicatorSource={testImage}
              defaultSource={testImage}
              resizeMode="cover"
            />
          </View>
          <Text style={productName}>{dealdetail.short_title}</Text>
        </View>
        <View style={dealInfo}>
          <View style={amountView}>
            <Text style={strikeText}>{"N" + " " + dealdetail.list_price}</Text>
            <Text style={priceText}>
              {"N" + " " + dealdetail.discounted_price}
            </Text>
          </View>
          <View style={amountView}>
            <Text style={normText}>Discount</Text>
            <Text style={discountText}>
              {dealdetail.percent_discount + " %off"}
            </Text>
          </View>
          <View style={amountView}>
            <Text style={normText}>You save</Text>
            <Text style={discountText}>{dealdetail.saving}</Text>
          </View>
          <View style={amountView}>
            <Text style={normText}>sold</Text>
            <Text style={normText}>{dealdetail.bought_count}</Text>
          </View>
        </View>
        <View style={bottomHeader}>
          <Button onPress={() => console.log("pressed")} color="#e25902">
            Buy now
          </Button>
          <Button
            onPress={() => addItemToCart(cart_id, dealdetail.id, variant_id, 1)}
            color="#d0d0d0"
          >
            add to cart
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
  progressBar: {
    backgroundColor: "#f8f8f8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    largeloading: state.ui.largeloading,
    cartdetail: state.cart.cartdetail,
    variantdetail: state.cart.variantdetail
  };
};
const mapDispatchToProps = dispatch => {
  return {
    //deal_id, variant_id, quantity
    addItemToCart: (cart_id, deal_id, variant_id, quantity) =>
      dispatch(actions.addItemToCart(cart_id, deal_id, variant_id, quantity))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(DealDetailScreen);
