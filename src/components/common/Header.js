import React from "react";
import { Text, View } from "react-native";

// Make a component
const HeaderComponent = ({ leftContent, rightContent }) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      {leftContent}
      {rightContent}
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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
  textStyle: {
    fontSize: 20
  }
};

// Make the component available to other parts of the app
export default HeaderComponent;
