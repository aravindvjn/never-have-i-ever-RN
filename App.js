import { StyleSheet } from "react-native";
import Wrapper from "./components/Wrapper";
import Route from "./Route";

export default function App() {
  return (
    <Wrapper>
      <Route />
    </Wrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
