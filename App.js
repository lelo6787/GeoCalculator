import React from 'react';
import { StyleSheet, SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GeoCalculator from './GeoCalculator.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SettingEdit from './SettingEdit.js';
import History from './History.js';
export default function App() {
  const Stack = createStackNavigator();
 return (
   <NavigationContainer >
     <Stack.Navigator screenOptions ={{
         headerStyle: {
           backgroundColor: '#337fb2',},
           headerTintColor: '#fff',
           headerTitleStyle: {
            alignSelf: 'center',
          },
         }}>
       <Stack.Screen name="GeoCalculator" component={GeoCalculator}/>
     <Stack.Screen name="SettingEdit" component={SettingEdit} options ={{
          title: 'Settings',
         }}/>
      <Stack.Screen name="History" component={History}/>
  
  </Stack.Navigator>
   </NavigationContainer>
 );
}
 
const styles = StyleSheet.create({
 container: {
   backgroundColor: "blue",
   margin: 20,
   flex: 1
 },
});

