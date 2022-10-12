

import * as React from "react";
import {useState} from 'react';
import { Dimensions } from "react-native";
import { Text, View, StyleSheet, StatusBar,  } from "react-native";
import { TextInput } from "react-native-gesture-handler";




export function LoginScreen() {
 const [userName,setUserName] = useState('');
 const [passWord, setPassword] = useState('')
  return (
    <View  style={styles.container}>
     <Text>Username</Text>
    <TextInput placeholder={'username'} styles={styles.textInput}></TextInput>
    <Text>Password</Text>
    <TextInput placeholder="password"></TextInput>
      <Text> This is my loginscreen</Text>
     

      
    </View>
  );
}

const styles = StyleSheet.create({

 container:{
    marginTop:50,
    marginLeft:'auto',
    marginRight:'auto'
 }
 
  
});
