import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Card(props) {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    elevation: 12,
    padding: 20,
    borderRadius: 10,
  },
});
