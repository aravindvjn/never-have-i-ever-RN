import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, globalStyles } from "../global/constants";
import NeverHaveIEver from "../assets/svg/NeverHaveIEver";
import Button from "../components/ui/Button";

const WelcomeScreen = ({ setWelcome }) => {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <NeverHaveIEver />
        <Button onPress={()=>setWelcome(false)} text="Get Started" textStyle={{ fontStyle: "italic" }} />
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
