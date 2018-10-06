import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import testImage from "../assets/img/flix.png";
import Icon from "react-native-vector-icons/Ionicons";

const listcard = ({ img, quantity, title, listPrice, fetchDetails }) => {
  const {
    soldView,
    middleView,
    cardView,
    testImageStyle,
    ImageView,
    headTitle,
    priceText,
    normText,
    otherText
  } = styles;
  let smallLoader = <ActivityIndicator size="large" color="red" />;
  return (
    <TouchableOpacity onPress={fetchDetails} style={cardView}>
      <View style={ImageView}>
        <Image
          source={{ uri: img }}
          resizeMode="cover"
          loadingIndicatorSource={testImage}
          defaultSource={testImage}
          style={testImageStyle}
        />
      </View>
      <View style={middleView}>
        <Text style={headTitle}>{title}</Text>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text style={normText}>Quantity</Text>
          <Text style={{ paddingLeft: 10 }}>{quantity}</Text>
        </View>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text style={normText}>Price</Text>
          <Text style={priceText}>{listPrice}</Text>
        </View>
        <View style={soldView}>
          <Text style={normText}>Sold by</Text>
          <View>
            <Text
              style={[
                otherText,
                { paddingLeft: 10, paddingRight: 20, flexWrap: "wrap" }
              ]}
            >
              House of Taya
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: "5%" }}>
        <Icon name="ios-trash" size={30} color="#666666" />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  cardView: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    minHeight: 180,
    width: "100%",
    paddingTop: 15,
    shadowColor: "#000",
    position: "relative",
    marginBottom: 10
    //backgroundColor: "red"
  },
  ImageView: {
    width: "40%",
    height: 140
  },
  middleView: {
    width: "45%",
    flexDirection: "column"
  },
  testImageStyle: {
    width: "100%",
    height: "100%"
  },
  headTitle: {
    color: "#666666",
    fontSize: 18,
    textAlign: "left"
  },
  priceText: {
    color: "#29a981",
    fontSize: 14,
    paddingRight: 16,
    fontWeight: "bold",
    paddingLeft: 20
  },
  soldView: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15
  },
  normText: {
    color: "black",
    fontWeight: "500",
    fontSize: 14,
    textTransform: "uppercase"
  },
  otherText: {
    color: "black",

    fontSize: 14,
    textTransform: "uppercase"
  }
});

export default listcard;