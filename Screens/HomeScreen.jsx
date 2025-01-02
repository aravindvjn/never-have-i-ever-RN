import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { COLORS, globalStyles } from "../global/constants";
import Button from "../components/ui/Button";

const HomeScreen = ({
  isLoading,
  setInput,
  handleCreateRoom,
  handleJoinRoom,
  error,
}) => {
  const { setRoomId, setPassword, setUserName } = setInput;
  return (
    <View>
      <Text style={[globalStyles.textColor, styles.text]}>
        Join or Create Room
      </Text>
      <View>
        <TextInput
          onChangeText={(text) => setRoomId(text)}
          keyboardType="number-pad"
          style={styles.input}
          placeholder="Room ID"
        />
        <TextInput
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          placeholder="Password"
        />
        <TextInput
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
          placeholder="Your Name"
        />
        <Button
          onPress={handleJoinRoom}
          text={isLoading.join ? "Joining..." : "Join"}
          textStyle={{ fontWeight: "bold" }}
        />
        <Button
          onPress={handleCreateRoom}
          text={isLoading.create ? "Creating..." : "Create"}
          style={{ backgroundColor: "green" }}
          textStyle={{ fontWeight: "bold" }}
        />
        {error && <Text style={styles.error}>{error}</Text>}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  input: {
    borderRadius: 6,
    padding: 8,
    borderColor: COLORS.foreground,
    borderWidth: 2,
    backgroundColor: COLORS.foreground,
    marginTop: 15,
    fontSize: 16,
  },
  text: {
    fontSize: 25,
  },
  error: {
    color: "red",
    fontSize:14,
    paddingTop:10
  },
});
