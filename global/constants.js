import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#212121",
  foreground: "#ededed",
  card: "#3c3c3c",
  blue:'#3B82F6'
};
export const globalStyles = StyleSheet.create({
  backgroundColor: {
    backgroundColor: COLORS.background,
  },
  textColor: {
    color: COLORS.foreground,
  },
});
