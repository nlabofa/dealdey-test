import React from "react";
import { Text, View, Image } from "react-native";
import HeaderComponent from "../components/Header";
import shoppingCartImage from "../assets/img/shopping-cart.png";
const defaultscreen = () => {
  const rightContent = (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
      }}
    >
      <Image source={shoppingCartImage} style={{ width: 30, height: 30 }} />
      <View
        style={{
          position: "absolute",
          top: -10,
          left: -29,
          borderRadius: 50,
          width: 30,
          backgroundColor: "#bd2a2a"
        }}
      >
        <Text style={{ padding: 5, textAlign: "center", color: "white" }}>
          3
        </Text>
      </View>
    </View>
  );
  const leftContent = <Text />;
  return (
    <HeaderComponent leftContent={leftContent} rightContent={rightContent} />
  );
};

export default defaultscreen;
