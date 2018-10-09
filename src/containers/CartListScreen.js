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
import DealCard from "../components/DealCard";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import ListCard from "../components/ListCard";
import { Button, ProgressBar } from "../components/common";
import { Actions } from "react-native-router-flux";
import shoppingcartImage from "../assets/img/shopping-cart.png";

class CartListScreen extends Component {
  state = {
    cartempty: false
  };
  componentDidMount() {
    //this checks whether the cart is empty. if it is empty we want to show a seperate view
    if (
      this.props.cartdetail.cart &&
      this.props.cartdetail.cart.cart_items_count === null
    ) {
      this.setState({
        cartempty: true
      });
    } else {
      this.setState({ cartempty: false });
    }
  }
  renderFooter = () => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#e8e8e8"
        }}
      />
    );
  };
  //get deals details. for empty cart view
  fetchDetails = (id, fetchVar) => {
    if (fetchVar === 0) {
      //if variants_have_same_price is 0 i.e variants does not have same price hence we want to fetch the variant id seperately
      this.props.getDealVariant(id);
      this.props.FetchDealsDetails(id);
      return;
    } else {
      this.props.FetchDealsDetails(id);
    }
  };
  //render header. for empty cart view
  renderHeader = () => {
    return (
      <View>
        <HeaderComponent
          leftContent={this.leftContent}
          rightContent={<Text />}
        />
        <View style={{ paddingHorizontal: "2%", marginBottom: 20 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              paddingBottom: 10
            }}
          >
            Oops!Your cart is empty
          </Text>
          <Text style={{ fontSize: 16 }}>
            Your cart feels pretty empty.Here are some deals to get you started.
          </Text>
        </View>
      </View>
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
      subTotalView,
      progressBar,
      Emptycontainer
    } = styles;
    const {
      cartdetail,
      largeloading,
      proceedToCheckout,
      removeItemFromCart
    } = this.props;
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
    //fetch the deals to render if cart is empty
    const bestsellerdeal = cartdetail ? cartdetail.bestseller_deals : "";
    //what to display for empty cart view
    const cartEmptyView = (
      <View style={Emptycontainer}>
        <View style={{ width: "100%" }}>
          <FlatList
            numColumns={2}
            data={bestsellerdeal}
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
          />
        </View>
      </View>
    );
    return this.state.cartempty ? (
      cartEmptyView
    ) : largeloading ? (
      <View style={progressBar}>
        <ProgressBar sizeL="large" />
      </View>
    ) : (
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
                removeItem={() =>
                  removeItemFromCart(cartdetail.cart.id, item.id)
                }
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
          <Button
            onPress={() => proceedToCheckout(cartdetail.cart.id)}
            fullwidth
            color="#e25902"
          >
            PROCEED TO CHECKOUT
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
  Emptycontainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: "2%"
  },
  normText: {
    color: "black",
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

const mapStateToprops = state => {
  return {
    largeloading: state.ui.largeloading,
    cartdetail: state.cart.cartdetail
  };
};
const mapDispatchToProps = dispatch => {
  return {
    FetchDealsDetails: id => dispatch(actions.FetchDealsDetais(id)),
    getDealVariant: id => dispatch(actions.getDealVariant(id)),
    proceedToCheckout: cart_id => dispatch(actions.getCheckOutDetail(cart_id)),
    removeItemFromCart: (cart_id, cart_item_id) =>
      dispatch(actions.removeItemFromCart(cart_id, cart_item_id))
  };
};
export default connect(
  mapStateToprops,
  mapDispatchToProps
)(CartListScreen);
