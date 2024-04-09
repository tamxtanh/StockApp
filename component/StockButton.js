import { StyleSheet, Text, TouchableOpacity } from "react-native";

import React from "react";

const StockButton = ({ name, indexCode, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => onPress(name, indexCode)}
    >
      <Text>{name}</Text>
    </TouchableOpacity>
  );
};

export default StockButton;

const styles = StyleSheet.create({
  button: {
    margin: 10,
    borderWidth: 1,
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
});
