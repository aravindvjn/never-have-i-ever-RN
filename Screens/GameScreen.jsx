import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { COLORS, globalStyles } from "../global/constants";
import Button from "../components/ui/Button";

const GameScreen = ({
  question,
  getNewQuestion,
  sendAnswers,
  answer,
  allAnswers,
  allPlayers,
  liveAnswers,
}) => {
  const [liveStatus, setLiveStatus] = useState([]);
  const [wait, setWait] = useState(0);

  useEffect(() => {
    setLiveStatus([]);
    allPlayers?.map((player) => {
      const thePlayer = liveAnswers?.filter((ans) => {
        return ans?.userName === player?.userName;
      })[0];
      if (liveAnswers?.length === 0) {
        setLiveStatus((prev) => [
          ...prev,
          { userName: player?.userName, answer: "" },
        ]);
      } else {
        setLiveStatus((prev) => [
          ...prev,
          { userName: player?.userName, answer: thePlayer?.answer },
        ]);
      }
    });
  }, [liveAnswers, allAnswers, allPlayers]);

  useEffect(() => {
    if (allAnswers?.length > 0) {
      setWait(5);
      const intervalId = setInterval(() => {
        setWait((prev) => {
          if (prev > 0) {
            return prev - 1;
          }
          clearInterval(intervalId);
          return 0;
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [allAnswers]);
  return (
    <View style={styles.container}>
      {/* Player Status Section */}
      <View style={styles.tableContainer}>
        <View style={styles.row}>
          <Text
            style={[
              globalStyles.textColor,
              { fontWeight: "bold" },
              styles.cell,
            ]}
          >
            Users
          </Text>
          <Text
            style={[
              globalStyles.textColor,
              { fontWeight: "bold" },
              styles.cell,
            ]}
          >
            Status
          </Text>
        </View>
        {allPlayers?.length > 0 && (
          <FlatList
            data={liveStatus}
            keyExtractor={(item) => item?.userName}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={[styles.cell, globalStyles.textColor]}>
                  {item?.userName}
                </Text>
                <Text style={[styles.cell, globalStyles.textColor]}>
                  {item?.answer !== "" ? "Answered" : "Not Answered Yet"}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionTitle}>Question</Text>
        <Text style={[globalStyles.textColor,styles.question]}>{question}</Text>
        {allAnswers?.length > 0 ? (
          <View style={styles.tableContainer}>
            <View style={styles.row}>
              <Text
                style={[
                  globalStyles.textColor,
                  { fontWeight: "bold" },
                  styles.cell,
                ]}
              >
                I Have
              </Text>
              <Text
                style={[
                  globalStyles.textColor,
                  { fontWeight: "bold" },
                  styles.cell,
                ]}
              >
                I Have Never
              </Text>
            </View>
            <FlatList
              data={Array.from({
                length: Math.max(
                  allAnswers.filter((ans) => ans.answer === "Yes").length,
                  allAnswers.filter((ans) => ans.answer === "No").length
                ),
              })}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ index }) => {
                const yesAnswers = allAnswers?.filter(
                  (ans) => ans.answer === "Yes"
                );
                const noAnswers = allAnswers?.filter(
                  (ans) => ans.answer === "No"
                );
                return (
                  <View style={styles.row}>
                    <Text style={[styles.cell, globalStyles.textColor]}>
                      {yesAnswers[index]?.userName || ""}
                    </Text>
                    <Text style={[styles.cell, globalStyles.textColor]}>
                      {noAnswers[index]?.userName || ""}
                    </Text>
                  </View>
                );
              }}
            />
            {wait > 0 ? (
              <Button text={`${wait} seconds`} />
            ) : (
              <Button onPress={getNewQuestion} text="Next Question" />
            )}
          </View>
        ) : (
          <View>
            <TouchableOpacity
              onPress={() => sendAnswers("Yes")}
              style={[
                styles.optionButton,
                answer === "Yes" && styles.selectedButton,
              ]}
            >
              <Text style={{ color: COLORS.foreground }}>I Have</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendAnswers("No")}
              style={[
                styles.optionButton,
                answer === "No" && styles.selectedButton,
              ]}
            >
              <Text style={{ color: COLORS.foreground }}>I Have Never</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  tableContainer: {
    width: "100%",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cell: {
    flex: 1,
    padding: 10,
    textAlign: "left",
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  questionContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: COLORS.card,
    borderRadius: 8,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.foreground,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: COLORS.foreground,
    height: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  selectedButton: {
    backgroundColor: "rgba(0, 200, 0, 0.8)",
  },
  optionText: {
    color: COLORS.foreground,
    fontSize: 16,
  },
  question:{
    fontSize:16,
    paddingBottom:20
  }
});

export default GameScreen;
