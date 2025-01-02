import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { globalStyles } from "../global/constants";
import { Picker } from "@react-native-picker/picker";
import Button from "../components/ui/Button";

const WaitingScreen = ({
  roomId = "Unavailable",
  allPlayers = [],
  isLoading,
  userName,
  handleStartGame,
  setSelected,
  selected,
}) => {
  return (
    <View>
      <Text style={[globalStyles.textColor, styles.roomId]}>
        Room ID : {roomId}
      </Text>
      <View>
        {allPlayers?.length > 0 ? (
          allPlayers.map((player, index) => (
            <Text
              style={[globalStyles.textColor, styles.players]}
              key={player?.socketId}
            >
              {index + 1}. {player?.userName}
              {index === 0 && " (Owner)"}
            </Text>
          ))
        ) : (
          <Text>Waiting for players to join.</Text>
        )}
        {allPlayers[0]?.userName === userName && (
          <View style={styles.container}>
            <Text style={[styles.label, globalStyles.textColor, styles.roomId]}>
              Select Question Type:
            </Text>
            <Picker
              selectedValue={selected}
              onValueChange={(itemValue) => setSelected(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Normal" value="Normal" />
              <Picker.Item label="18+" value="18+" />
            </Picker>
          </View>
        )}
        {allPlayers?.length > 1 && allPlayers[0]?.userName === userName && (
          <Button
            style={{ backgroundColor: "green" }}
            onPress={handleStartGame}
            text={
              isLoading.create && isLoading.join ? "Starting..." : "Start Now"
            }
          />
        )}
        {allPlayers?.length === 1 && (
          <Button
            style={{ backgroundColor: "grey" }}
            onPress={handleStartGame}
            text="Start Now"
          />
        )}
        {allPlayers[0]?.userName !== userName && (
                <Text style={[globalStyles.textColor,{textAlign:'center',marginTop:20,opacity:0.8}]}>
                  Waiting for the admin to begin.
                </Text>
              )}
      </View>
    </View>
  );
};

export default WaitingScreen;

const styles = StyleSheet.create({
  roomId: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "600",
  },
  players: {
    fontSize: 18,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
});
