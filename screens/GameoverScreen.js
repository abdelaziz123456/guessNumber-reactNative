import { View, Text, StyleSheet, Button, Image } from "react-native";

import React from "react";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";
import MainButton from "../components/MainButton";

export default function GameoverScreen(props) {
  return (
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
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: 300,
    borderRadius: 200,
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
