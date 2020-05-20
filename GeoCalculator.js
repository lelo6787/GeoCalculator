import React, { useState} from "react";
import {StyleSheet, Text, View, TextInput, Keyboard} from "react-native";
import {Button} from "react-native-elements";
import {Input} from "react-native-elements";

const GeoCalculator = () => {
    const [sourceLat, setsourceLat] = useState('');
    const [sourceLong, setsourceLong] = useState('');
    const [targetLat, settargetLat] = useState('');
    const [targetLong, settargetLong] = useState('');
    const [distance, setdistance] = useState('');
    const [bearing, setbearing] = useState('');
    const [errorMsg, seterrorMsg] = useState('');
    const [errorMsg1, seterrorMsg1] = useState('');
    const [errorMsg2, seterrorMsg2] = useState('');
    const [errorMsg3, seterrorMsg3] = useState('');
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
    const Calculate = () => {
        if(formValidate(sourceLat) && formValidate(sourceLong) 
        && formValidate(targetLat) 
        && formValidate(targetLong)){
        const calDistance = computeDistance(sourceLat, sourceLong, targetLat, targetLong);
        const calBearing = computeBearing(sourceLat, sourceLong, targetLat, targetLong);
        setdistance(`Distance: ${calDistance}`);
        setbearing(`Bearing: ${round(calBearing,3)} degrees`);
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
    return `${round(d, 3)} km`;
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
    console.log(val);
    let value = isNaN(val) ? "Must be a number" : "";
    console.log(value);
    return value;
}
 
    return (
        <View>
            
            <Input placeholder="Enter latitude for point 1" value={sourceLat} errorMessage = {validateValue(sourceLat)}  onChangeText = {setsourceLat}/>
            <Input placeholder="Enter longtitude for point 1" value={sourceLong} errorMessage = {validateValue(sourceLong)}  onChangeText = {setsourceLong}/>
            <Input placeholder="Enter latitude for point 2" value={targetLat} errorMessage = {validateValue(targetLat)}  onChangeText = {settargetLat}/>
            <Input placeholder="Enter longtitude for point 2" value={targetLong} errorMessage = {validateValue(targetLong)}  onChangeText = {settargetLong} />
            <Button title="Calculate" onPress = {Calculate}></Button>
            <Button title="Clear" onPress = {ClearAll}></Button>
            <Text>{distance}</Text>
            <Text>{bearing}</Text>
        </View>
    );
}
export default GeoCalculator;