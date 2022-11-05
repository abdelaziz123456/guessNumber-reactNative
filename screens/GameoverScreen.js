import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView,SafeAreaView } from "react-native";

import React,{useState} from "react";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

export default function GameoverScreen(props) {

  const [deviceWidth,setDeviceWidth]=useState(Dimensions.get('window').width)
const setLayout=()=>{
  setDeviceWidth(Dimensions.get('window').width);
  
}
  Dimensions.addEventListener('change',setLayout)
  return (
    <SafeAreaView>
    <ScrollView>
    <View style={styles.screen}>
      <TitleText>The Game is over</TitleText>
      <Image
        source={require("../assets/success.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <BodyText style={styles.resultText}>
        Your phone needed{" "}
        <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
        guess <Text style={styles.highlight}>{props.userNumber}</Text>{" "}
      </BodyText>

     

      <MainButton onPress={props.onRestart} >New Game</MainButton>
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical:10
  },
  image: {
    width: Dimensions.get('window').width * .7,
    height: Dimensions.get('window').width * .7,
    borderRadius: Dimensions.get('window').width * .7/2,
    marginBottom: 20,
  },
  resultText: {
    textAlign: "center",
    fontSize:15,
    marginVertical:15
  },
  highlight: {
    color: colors.primary,
    fontFamily: "open-sans-bold",
  },
});
