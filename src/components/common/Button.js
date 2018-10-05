import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children, color }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[buttonStyle, { backgroundColor: color }]}
    >
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase"
  },
  buttonStyle: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "transparent"
  }
};

export { Button };
