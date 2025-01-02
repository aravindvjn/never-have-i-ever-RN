import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../global/constants";

const Wrapper = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {children}
    </SafeAreaView>
  );
};

export default Wrapper;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
});
