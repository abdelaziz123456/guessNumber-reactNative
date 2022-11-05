import React from 'react'
import { StyleSheet, Text, View,Platform } from 'react-native'
import colors from '../constants/colors'
export default function Header(props) {
  return (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  )
}


const styles=StyleSheet.create({
header:{
    width:'100%',
    height:80,
    paddingTop:20,
    backgroundColor:Platform.OS == '' ?  colors.primary : 'white',
    alignItems:'center',
    justifyContent:'center'
},
headerTitle:{
    color:'black',
    fontSize:18
}
})