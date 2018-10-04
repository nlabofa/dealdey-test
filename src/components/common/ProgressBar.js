import React from "react";
import { View, ActivityIndicator, StyleSheet, Platform } from "react-native";

const ProgressBar = ({ sizeL, colorL }) => (
  <View style={styles.progressBar}>
    <ActivityIndicator
      size={sizeL ? sizeL : "small"}
      color={colorL ? colorL : "#2bac46"}
    />
  </View>
);

const styles = StyleSheet.create({
  progressBar: {
    flex: 1,
    justifyContent: "center"
  }
});

export { ProgressBar };
