import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";
import colors from "../constants/colors";

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNumber] = useState();
  function inputHandler(inputText) {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  }

  function resetInput() {
    setEnteredValue("");
    setConfirmed(false);
  }

  function confirmInput() {
    const chosenNumber = parseInt(enteredValue);
  
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert("Invalid Number", "Number should be  0 < N < 100 ", [
        { text: "Okay", style: "destructive", onPress: resetInput },
      ]);
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue("");
    Keyboard.dismiss()
  }
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game ! </Text>

        <Card style={styles.inputContainer}>
          <Text>Select A Number</Text>
          <Input
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="numeric"
            maxLength={2}
            style={styles.input}
            value={enteredValue}
            onChangeText={inputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={resetInput}
                color={colors.accent}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInput}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {/* mssage fof chosen number */}
        {confirmed ? (
          <Card style={styles.chosenNumber}>
            <Text style={{ textAlign: "center" }}>You Selected</Text>
            <View style={styles.numContainer}>
              <Text style={{ textAlign: "center", color: colors.accent }}>
                {selectedNum}
              </Text>
            </View>

            <Button title='Start Game' color={colors.primary} onPress={()=>props.onStartGame(selectedNum)} />

            
          </Card>
        ) : (
          <></>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily:'open-sans-bold'
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  button: {
    width: 80,
  },
  input: {
    textAlign: "center",
  },
  chosenNumber: {
    marginVertical: 20,
  },
  numContainer: {
    marginVertical: 10,
    borderColor: colors.accent,
    borderWidth: 1,
    padding:8,
    borderRadius:9
  },
});
