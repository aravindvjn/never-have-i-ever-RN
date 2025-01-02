import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import WelcomeScreen from "./Screens/WelcomeScreen";
import { COLORS } from "./global/constants";
import HomeScreen from "./Screens/HomeScreen";
import WaitingScreen from "./Screens/WaitingScreen";
import GameScreen from "./Screens/GameScreen";

let socket;
const Route = () => {
  const [roomId, setRoomId] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [question, setQuestion] = useState("");
  const [allPlayers, setAllPlayers] = useState([]);
  const [responses, setResponses] = useState([]);
  const [allAnswers, setAllAnswers] = useState([]);
  const [answer, setAnswer] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [error, setError] = useState("");
  const [roomCreated, setRoomCreated] = useState(false);
  const [isLoading, setIsLoading] = useState({
    join: false,
    create: false,
  });
  const [liveAnswers, setLiveAnswers] = useState([]);
  const [welcome, setWelcome] = useState(true);
  const [selected, setSelected] = useState("Normal");

  useEffect(() => {
    socket = io("https://never-have-i-ever-uma0.onrender.com");

    socket.on("allPlayers", (players) => {
      setAllPlayers(players);
    });
    socket.on("allResponses", (responses) => {
      setResponses(responses);
    });

    socket.on("roomCreated", (roomId) => {
      setRoomCreated(true);
      setError("");
      setIsLoading({
        join: false,
        create: false,
      });
    });

    // Listen for roomJoined
    socket.on("roomJoined", (roomId) => {
      setRoomCreated(true);
      setError("");
      setIsLoading({
        join: false,
        create: false,
      });
    });

    socket.on("error", (message) => {
      setIsLoading({
        join: false,
        create: false,
      });
      setError(message);
    });

    const gameLogicCommunication = () => {
      socket.on("newQuestion", (question) => {
        setQuestion(question);
      });

      socket.on("answers", (ans) => {
        const emptyAnswers = ans.filter((player) => player.answer === "");
        setLiveAnswers(ans);

        if (emptyAnswers?.length === 0) {
          setAllAnswers(ans);
          return;
        }
        if (ans?.length === emptyAnswers?.length) {
          setAllAnswers([]);
          setAnswer("");
          setLiveAnswers([]);
        }
      });
      socket?.off("roomCreated");
      socket?.off("roomJoined");
    };

    socket?.on("gameStarted", () => {
      setGameStarted(true);
      gameLogicCommunication();
    });

    if (gameStarted) {
      gameLogicCommunication();
    }

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinRoom = () => {
    if (!roomId || !password || !userName) {
      setError("Please fill all fields!");
      return;
    }
    setIsLoading({
      join: true,
      create: false,
    });
    socket?.emit("joinRoom", { roomId, userName, password });
  };

  const handleStartGame = () => {
    setIsLoading({
      join: true,
      create: true,
    });
    socket?.emit("startGame", { roomId, selected });
  };

  const getNewQuestion = () => {
    socket?.emit("newQuestion", roomId);
  };

  const handleSubmitResponse = (response) => {
    socket?.emit("submitResponse", { roomId, userName, response });
  };

  const sendAnswers = (ans) => {
    if (answer) return;
    socket?.emit("answers", { roomId, answer: ans, userName });
    setAnswer(ans);
  };

  const handleCreateRoom = () => {
    if (roomId?.length < 4) {
      setError("Room ID must be more than 4 characters long.");
      return;
    }
    if (!userName || !roomId || !password) {
      setError("Please fill in room ID and password to create a room.");
      return;
    }
    setIsLoading({
      join: false,
      create: true,
    });
    socket?.emit("createRoom", { userName, roomId, password });
  };

  if (welcome) {
    return <WelcomeScreen setWelcome={setWelcome} />;
  }

  if (gameStarted) {
    return (
      <GameScreen
        liveAnswers={liveAnswers}
        allAnswers={allAnswers}
        answer={answer}
        allPlayers={allPlayers}
        setAnswer={setAnswer}
        sendAnswers={sendAnswers}
        question={question}
        getNewQuestion={getNewQuestion}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {!gameStarted && !roomCreated ? (
          <HomeScreen
            isLoading={isLoading}
            setInput={{ setRoomId, setPassword, setUserName }}
            handleJoinRoom={handleJoinRoom}
            handleCreateRoom={handleCreateRoom}
            error={error}
          />
        ) : (
          <WaitingScreen
            roomId={roomId}
            allPlayers={allPlayers}
            handleStartGame={handleStartGame}
            isLoading={isLoading}
            userName={userName}
            setSelected={setSelected}
            selected={selected}
          />
        )}
      </View>
    </View>
  );
};

export default Route;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    padding: 40,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    width: "100%",
  },
});
