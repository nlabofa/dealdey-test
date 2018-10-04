import React from "react";
import { Text, View, StyleSheet, Image, ActivityIndicator } from "react-native";
import testImage from "../assets/img/flix.png";
import Icon from "react-native-vector-icons/Ionicons";

const dealcard = ({ img, title, listPrice, discountedPrice, location }) => {
  const {
    cardView,
    testImageStyle,
    headTitle,
    priceView,
    priceText,
    strikeText,
    locationView,
    locationText
  } = styles;
  let smallLoader = <ActivityIndicator size="large" color="red" />;
  return (
    <View style={cardView}>
      <Image
        source={{ uri: img }}
        resizeMode="contain"
        loadingIndicatorSource={testImage}
        defaultSource={testImage}
        style={testImageStyle}
      />
      <Text style={headTitle}>{title}</Text>
      <View style={priceView}>
        <Text style={priceText}>{"N" + " " + discountedPrice}</Text>
        <Text style={strikeText}>{"N" + " " + listPrice}</Text>
      </View>
      <View style={locationView}>
        <Icon name="md-pin" size={30} color="#666666" />
        <Text style={locationText}>{location}</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cardView: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: "white",
    minHeight: 210,
    width: "49%",
    paddingTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: "relative",
    marginBottom: 10,
    marginRight: 5
  },
  testImageStyle: {
    width: "100%",
    height: 100
  },
  headTitle: {
    color: "#666666",
    fontSize: 18,
    paddingTop: 15,
    textAlign: "left",
    paddingHorizontal: 10
  },
  priceView: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10
  },
  priceText: {
    color: "#2bac46",
    fontSize: 18,
    paddingRight: 16,
    fontWeight: "bold"
  },
  strikeText: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    color: "black",
    fontSize: 18
  },
  locationView: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 15
  },
  locationText: {
    paddingLeft: 5,
    paddingRight: 8,
    fontSize: 18,
    color: "#666666"
  }
});

export default dealcard;
