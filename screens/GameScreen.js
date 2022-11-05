import { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
  SafeAreaView
} from "react-native";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  let rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};
export default function GameScreen(props) {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([{key:'1',guessValue:initialGuess.toString()}]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [deviceHeight,setDeviceHeight]=useState(Dimensions.get('window').height)

  const { userChoice, onGameOver } = props;


  useEffect(()=>{
    const updateLayout=()=>{
      setDeviceHeight(Dimensions.get('window').height)
    }
    Dimensions.addEventListener('change',updateLayout)
    return ()=>{
      Dimensions.removeEventListener('change',updateLayout)
    }
  })
  useEffect(() => {
    if (currentGuess == props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);
  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction == "greater" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie !", "you know that this is wrong", [
        { text: "sorry", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNum = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);

    setPastGuesses([ ...pastGuesses,{key:(pastGuesses.length+1).toString(),guessValue:nextNum.toString()}]);
  };


  if(Dimensions.get('window').height <500){

  console.log('landscape')
  return (
    <SafeAreaView>
    <View
      style={{
       justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      }}
    >
      <Card style={styles.inputContainer}>
        <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
        
        <View style={styles.buttonContainer}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <View style={{...styles.numContainer,width:50}}>
          <Text style={{ textAlign: "center", color: colors.accent,fontSize:20 }}>
            {currentGuess}
          </Text>
        </View>
          <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>

    
      <FlatList contentContainerStyle={{alignItems:"center",paddingBottom:150}} data={pastGuesses} renderItem={({item})=>(
          <View key={item.key} style={styles.listItem}>
            <BodyText>#{item.key}</BodyText>
            <BodyText>{item.guessValue}</BodyText>
          </View>
      
        
        )}  />
    </View>
    </SafeAreaView>
  );
}else{
  console.log('portrait')
  return (<View
  style={{
   justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  }}
>
  <Card style={styles.inputContainer}>
    <Text style={defaultStyles.titleText}>Opponent's Guess</Text>
    <View style={styles.numContainer}>
      <Text style={{ textAlign: "center", color: colors.accent }}>
        {currentGuess}
      </Text>
    </View>
    <View style={styles.buttonContainer}>
      <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
        <Ionicons name="md-remove" size={24} color="white" />
      </MainButton>
      <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
        <Ionicons name="md-add" size={24} color="white" />
      </MainButton>
    </View>
  </Card>


  <FlatList contentContainerStyle={{alignItems:"center",paddingBottom:150}} data={pastGuesses} renderItem={({item})=>(
      <View key={item.key} style={styles.listItem}>
        <BodyText>#{item.key}</BodyText>
        <BodyText>{item.guessValue}</BodyText>
      </View>
  
    
    )}  />
</View>)
}
}

let styles = StyleSheet.create({
  numContainer: {
    marginVertical: 10,
    borderColor: colors.accent,
    borderWidth: 1,
    padding: 8,
    borderRadius: 9,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems:'center',
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop:Dimensions.get('window').height >580 ? 20 :5  
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  listItem:{
    flexDirection:'row',
    borderColor:'#ccc',
    borderWidth:1,
    padding:15,
    marginVertical:10,
    backgroundColor:'white',
    justifyContent:'space-around',
    width:Dimensions.get('window').width>350 ? '60%' : '80%'
  }
});
