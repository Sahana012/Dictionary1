import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './homeScreen.js'

export default function App() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
});