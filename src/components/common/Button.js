import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ onPress, children, color, fullwidth }) => {
  const { buttonStyle, textStyle } = styles;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        buttonStyle,
        fullwidth
          ? { width: "100%", backgroundColor: color }
          : { width: "45%", backgroundColor: color }
      ]}
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
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "transparent"
  }
};

export { Button };
