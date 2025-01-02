import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../../global/constants";

const Button = ({ onPress, style, text = "Click Me", textStyle }) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        style={({ pressed }) =>
          pressed
            ? [styles.pressable, style, styles.pressed]
            : [styles.pressable, style]
        }
      >
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  pressable: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.blue,
    marginTop:15,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 17,
    color: COLORS.foreground,
  },
});
