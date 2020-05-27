import React, { useState, useEffect} from "react";
import {StyleSheet, Text, View, TextInput, Keyboard, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import {Button} from "react-native-elements";
import {Input} from "react-native-elements";
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const GeoCalculator = ({route, navigation}) => {
    const [sourceLat, setsourceLat] = useState('');
    const [sourceLong, setsourceLong] = useState('');
    const [targetLat, settargetLat] = useState('');
    const [targetLong, settargetLong] = useState('');
    const [distance, setdistance] = useState('');
    const [bearing, setbearing] = useState('');
   // const [distanceUnit, setdistanceUnit] = useState('Kilometers');
    const [distanceUnit, setdistanceUnit] = useState('Kilometers');
    const [bearingUnit, setbearingUnit] = useState('Degrees');

    const ClearAll = () => {
        Keyboard.dismiss();
        setsourceLat('');
        setsourceLong('');
        settargetLat('');
        settargetLong('');
        setdistance('');
        setbearing('');
    }
    const formValidate = (val) =>{
        if(val && !isNaN(val)){
            return true;
        }
        return false;
    }
    const DisplayResults = () =>{
      Calculate(distanceUnit, bearingUnit);
    }
    const Calculate = (dUnit, bUnit) => {
      console.log("get in here?")
        if(formValidate(sourceLat) && formValidate(sourceLong) 
        && formValidate(targetLat) 
        && formValidate(targetLong)){
          console.log("get in here2?")
        const calDistance = computeDistance(sourceLat, sourceLong, targetLat, targetLong);

        const calBearing = computeBearing(sourceLat, sourceLong, targetLat, targetLong);
        const updatedDistance = (dUnit === "Miles") ? round((calDistance *0.621371),3) : calDistance;
        console.log(distanceUnit);
        setdistance(`${updatedDistance} ${dUnit}`);
        const updatedBearing = (bUnit === "Mils") ? (calBearing * 17.777777777778) : calBearing;
        console.log(bearingUnit);
        setbearing(`${round(updatedBearing,3)} ${bUnit}`);
        }else{
            console.log("One of the field is empty.");
        }
    }
    // Converts from degrees to radians.
 function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  
  // Converts from radians to degrees.
  function toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }
  
  // Computes distance between two geo coordinates in kilometers.
  function computeDistance(lat1, lon1, lat2, lon2) {
    console.log(`p1={${lat1},${lon1}} p2={${lat2},${lon2}}`);
    var R = 6371; // km (change this constant to get miles)
    var dLat = ((lat2 - lat1) * Math.PI) / 180;
    var dLon = ((lon2 - lon1) * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;

    return round(d, 3);
  }
  
  // Computes bearing between two geo coordinates in degrees.
  function computeBearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);
  
    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x = Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  var brng = Math.atan2(y, x);
  brng = toDegrees(brng);

  return (brng + 360) % 360;
}

function round(value, decimals) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
}
const validateValue = (val) => {
    let value = isNaN(val) ? "Must be a number" : "";
    return value;
}

navigation.setOptions({
  headerRight: () => (
  <TouchableOpacity
  onPress={() => 
  navigation.navigate('SettingEdit', {distanceUnit,bearingUnit})
}
>
<Feather name="settings" size={24} color="white" style={{marginRight: 10}}/>
</TouchableOpacity>
  ),
});
 
useEffect(() =>{
  
  let updatedDistanceUnit = ""; //route.params.distanceUnit;
  let updatedBearingUnit =  ""; //route.params.bearingUnit;
  if(route.params?.distanceUnit){
    console.log("update distance");
    updatedDistanceUnit = route.params.distanceUnit;
    setdistanceUnit(route.params.distanceUnit);
    console.log(route.params.distanceUnit);
  }
  if(route.params?.bearingUnit){
    console.log("Update bearing");
    console.log(route.params.bearingUnit);
    updatedBearingUnit =  route.params.bearingUnit;
    
    setbearingUnit( route.params.bearingUnit);
    
  }
  Calculate(updatedDistanceUnit, updatedBearingUnit);
}, [route.params?.distanceUnit, route.params?.bearingUnit]);
    return (
      <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
      <SafeAreaView  style={styles.container}>
        <View> 
            <Input placeholder="Enter latitude for point 1" value={sourceLat} style={styles.inputStyle}  errorMessage = {validateValue(sourceLat)}  onChangeText = {setsourceLat}/>
            <Input placeholder="Enter longtitude for point 1" value={sourceLong} style={styles.inputStyle} errorMessage = {validateValue(sourceLong)}  onChangeText = {setsourceLong}/>
            <Input placeholder="Enter latitude for point 2" value={targetLat} style={styles.inputStyle} errorMessage = {validateValue(targetLat)}  onChangeText = {settargetLat}/>
            <Input placeholder="Enter longtitude for point 2" value={targetLong} style={styles.inputStyle} errorMessage = {validateValue(targetLong)}  onChangeText = {settargetLong} />
            <Button title="Calculate" onPress = {DisplayResults}></Button>
            <View style={styles.spacer} ></View>
            <Button title="Clear" onPress = {ClearAll}></Button>        
        </View>
       
        <View style={styles.subcontainer}>
        <View style={ styles.b1}>
          <Text style={styles.text}>Distance:</Text>
        </View>
        <View  style={ styles.b2}>
        <Text style={styles.text}>{distance}</Text>
        </View>
        <View style={styles.b3}>
          <Text style={styles.text}>Bearing:</Text>
        </View>
        <View style={styles.b4}>
            <Text style={styles.text}>{bearing}</Text>
        </View>
        </View>
        </SafeAreaView>
   </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dfe2e7',
    flex: 1,
    padding: 10

  },
  subcontainer: {
    margin: 5,
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  },
  b: {
    width: '50%',
    padding: 5,
  },
  b1: {
    width: '50%',
    padding: 5,
    borderWidth: 1
  },
  b2: {
    width: '50%',
    padding: 5,
    borderBottomWidth:1,
    borderRightWidth: 1,
    borderTopWidth:1
  },
  b3: {
    width: '50%',
    padding: 5,
    borderLeftWidth: 1,
    borderBottomWidth:1,
    borderRightWidth:1
  },
  b4: {
    width: '50%',
    padding: 5,
    borderBottomWidth:1,
    borderRightWidth:1
  },
  inputStyle: {
    height: 20,
  }, 
  spacer: {
    padding: 10
  },
  text: {
    fontWeight: "bold"
  }

 });
export default GeoCalculator;