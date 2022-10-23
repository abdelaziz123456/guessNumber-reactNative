import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameoverScreen from "./screens/GameoverScreen";
import GameScreen from "./screens/GameScreen";
import StartGameScreen from "./screens/StartGameScreen";
import * as Font from 'expo-font' ;


const fetchFonts=()=>{
 return  Font.loadAsync({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds,setguessRounds]=useState(0);

  const configNewGame=()=>{
    setguessRounds(0);
    setUserNumber(null)
    
  }
  const startGameHandler=(selectedNumber)=>{
setUserNumber(selectedNumber)
setguessRounds(0)
  }
  
  const gameoverHandler=numOfRounds=>{
    setguessRounds(numOfRounds)
  }
  let content=<StartGameScreen onStartGame={startGameHandler}/>

  if(userNumber && guessRounds <=0){
    content=<GameScreen userChoice={userNumber} onGameOver={gameoverHandler} />
  }else if(guessRounds >0){
    content=<GameoverScreen userNumber={userNumber} roundsNumber={guessRounds}  onRestart={configNewGame}/>
  }
  return (
    <View style={styles.screen}>
      <Header title={"Guess A Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
