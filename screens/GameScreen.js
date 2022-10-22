import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";

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
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  return (
    <View style={{justifyContent:'center' ,alignItems:'center',marginVertical:10}}>
    <Card style={styles.inputContainer}>
      <Text>Opponent's Guess</Text>
      <View style={styles.numContainer}>
        <Text style={{ textAlign: "center", color: colors.accent }}>
          {currentGuess}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Lower" color={colors.accent}  />
        </View>
        <View style={styles.button}>
          <Button title="Greater" color={colors.primary} />
        </View>
      </View>
    </Card>
    </View>
  );
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
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
});
