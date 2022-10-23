
import {View,Text,StyleSheet,Button} from 'react-native';


import React from 'react'

export default function GameoverScreen(props) {
  return (
    <View style={styles.screen}>
        <Text>The Game is over</Text>
        <Text>Number of rounds: {props.roundsNumber}</Text>
        <Text>Number was : {props.userNumber}</Text>
        <Button  title='New Game' onpress={props.onRestart}/>
    </View>
  )
}


const styles=StyleSheet.create({
    screen:{
flex:1,
    justifyContent:'center',
    alignItems:'center'
    }
})
