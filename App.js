import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

//React Navigator
import RootStack from './Navigators/RootStack';



export default function App() {
  //let x=2;
  //console.log("App Executed");
  return <RootStack/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
