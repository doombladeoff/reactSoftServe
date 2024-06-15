import React from "react";
import { View, Image, StyleSheet } from "react-native";

const ImagePile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.island}>
        {/* TREE */}
        <Image
          source={require("../assets/palmtree.png")}
          style={[styles.tree, { bottom: 40, right: 220, zIndex: 1 }]}
        />
        <Image
          source={require("../assets/palmtree.png")}
          style={[styles.tree, { bottom: 250, right: 270 }]}
        />
        <Image
          source={require("../assets/palmtree.png")}
          style={[styles.tree, { bottom: 190, right: 0 }]}
        />

        {/* GRASS */}
        <Image
          source={require("../assets/grass.png")}
          style={[styles.tree, { bottom: 190, right: 100 }]}
        />

        {/* ELEPHANT */}
        <Image
          source={require("../assets/elephant.png")}
          style={styles.elephant}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 300,
    marginTop: 150,
  },
  island: {
    width: "100%",
    height: 400,
    backgroundColor: "#888",
    borderRadius: 200,
    transform: [{ rotateX: "70deg" }],
    justifyContent: "center",
    alignItems: "center",
  },
  tree: {
    position: "absolute",
    width: 150,
    height: 350,
    resizeMode: "stretch",
  },
  elephant: {
    position: "absolute",
    bottom: 40,
    right: 110,
    width: 120,
    height: 300,
    resizeMode: "stretch",
  },
});

export default ImagePile;
