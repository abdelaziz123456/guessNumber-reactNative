import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const startGameHandler=(selectedNumber)=>{
setUserNumber(selectedNumber)
  }
  return (
    <View style={styles.screen}>
      <Header title={"Guess A Number"} />
      {!userNumber ? <StartGameScreen /> : <GameScreen   />}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
