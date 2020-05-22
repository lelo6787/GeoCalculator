import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GeoCalculator from './GeoCalculator.js';
 
export default function App() {
 return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     <SafeAreaView style={styles.container} >
       <GeoCalculator />
     </SafeAreaView>
   </TouchableWithoutFeedback>
 );
}
 
const styles = StyleSheet.create({
 container: {
   backgroundColor: "#fff",
   margin: 20,
   flex: 1
 },
});

