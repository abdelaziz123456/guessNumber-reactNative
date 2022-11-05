import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView
} from "react-native";
import BodyText from "../components/BodyText";
import Card from "../components/Card";
import Input from "../components/Input";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import colors from "../constants/colors";

export default function StartGameScreen(props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNum, setSelectedNumber] = useState();

  const [buttonWidth,setButtonWidth]=useState(Dimensions.get('window').width/4);

  const updateLayout=()=>{
    
   setButtonWidth(Dimensions.get('window').width/4);
 
  }


  Dimensions.addEventListener('change',updateLayout)
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
    <SafeAreaView>
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={20}>
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <TitleText>Start a New Game !</TitleText>

        <Card style={styles.inputContainer}>
          <BodyText>Select A Number</BodyText>
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
            <View style={{minWidth:buttonWidth}}>
              <Button
                title="Reset"
                onPress={resetInput}
                color={colors.accent}
              />
            </View>
            <View style={{minWidth:buttonWidth}}>
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
            <BodyText>You Selected</BodyText>
            <View style={styles.numContainer}>
              <Text style={{ textAlign: "center", color: colors.accent }}>
                {selectedNum}
              </Text>
            </View>

            

            <MainButton onPress={()=>props.onStartGame(selectedNum)}>
            Start Game
            </MainButton>
          </Card>
        ) : (
          <></>
        )}
      </View>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
 
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  inputContainer: {
    minWidth: 300,
    width: "80%",
    maxWidth:'95%',
    alignItems: "center",
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
