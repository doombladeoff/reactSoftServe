import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoCard = (props) => {
  return (
    <View style={[styles.card, { borderColor: props.color }]}>
      <Text style={{ color: props.color }}>{props.number}</Text>
      <Text style={{ color: props.color }}>{props.caption}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 150,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#444",
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export default InfoCard;
