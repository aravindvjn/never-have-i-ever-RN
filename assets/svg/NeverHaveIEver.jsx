import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

const NeverHaveIEver = () => {
  return <Image style={styles.image} source={require("../images/logo.png")} />;
};

export default NeverHaveIEver;

const styles = StyleSheet.create({
  image: {
    objectFit: "contain",
    width: 150,
    height:160
  },
});
