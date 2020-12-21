import React from 'react';
import Main from "./src/main";
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from "react-native";

export default () => {
  return <View style={styles.container}>
    <StatusBar style="auto" />
    <Main />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})