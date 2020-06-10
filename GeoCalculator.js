import React, { useState, useEffect} from "react";
import {StyleSheet, Text, View, TextInput, Keyboard, SafeAreaView, TouchableWithoutFeedback} from "react-native";
import {Button} from "react-native-elements";
import {Input} from "react-native-elements";
import { Feather } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import {initFireBaseDB, writeData,setupDataListener } from './FirebaseGeoCalculatorDB.js';
import { color } from "react-native-reanimated";
import {getWeather} from './WeatherApi.js';


const ICONS = {
  img01d: require('./assets/img01d.png'),
  img01n: require('./assets/img01n.png'),
  img02d: require('./assets/img02d.png'),
  img02n: require('./assets/img02n.png'),
  img03d: require('./assets/img03d.png'),
  img03n: require('./assets/img03n.png'),
  img04d: require('./assets/img04d.png'),
  img04n: require('./assets/img04n.png'),
  img09d: require('./assets/img09d.png'),
  img09n: require('./assets/img09n.png'),
  img10d: require('./assets/img10d.png'),
  img10n: require('./assets/img10n.png'),
  img13d: require('./assets/img13d.png'),
  img13n: require('./assets/img13n.png'),
  img50d: require('./assets/img13d.png'),
  img50n: require('./assets/img13n.png'),
};
 
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
    const [history, setHistory] = useState([]);
    const [item, setitem] = useState({});
    const [sourceWeather, setSourceWeater] = useState({});
    const [targetWeather, settargetWeather] = useState({});
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
    const callback = (data) => {
      console.log("weather first");
        console.log(data);
    }
    const Calculate = (dUnit, bUnit) => {
     
         //get the weather outlook from the entered lat and lon
     /*    getWeather(sourceLat, sourceLong, (data => {
          setSourceWeater(data);
          console.log(sourceWeather);
        } ));

        getWeather(targetLat, targetLong, (data => {
          settargetWeather(data);
          console.log(targetWeather);
        } ));
*/

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
        //add to database
        const currentDate = Date();
        writeData({sourceLat: sourceLat, sourceLong: sourceLong, targetLat: targetLat,
           targetLong: targetLong, caltime: currentDate.toString()});
        
        //get the weather outlook from the entered lat and lon
         //get the weather outlook from the entered lat and lon
         getWeather(sourceLat, sourceLong, (data => {
          setSourceWeater(data);
          console.log(sourceWeather);
        } ));

        getWeather(targetLat, targetLong, (data => {
          settargetWeather(data);
          console.log(targetWeather);
        } ));

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
  headerLeft: () => (
    <TouchableOpacity
    onPress={() => 
    navigation.navigate('History', history)
  }
  
  >
    <Text style={{color: 'white', fontWeight: "bold"}}>History</Text>
  </TouchableOpacity>
  )
});
//call once to initialize firebase
useEffect(() =>{
  try {
  initFireBaseDB();
  } catch(err) {
    console.log(err);
  }
  setupDataListener(items => {
    setHistory(items);
   
  })
}, []); 
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
  if(route.params?.item){
    setsourceLat(route.params.item.sourceLat);
    setsourceLong(route.params.item.sourceLong);
    settargetLat(route.params.item.targetLat);
    settargetLong(route.params.item.targetLong);
    setdistance('');
    setbearing('');
  }
  else {
  Calculate(updatedDistanceUnit, updatedBearingUnit);
  }
}, [route.params?.distanceUnit, route.params?.bearingUnit,route.params?.item]);
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
        <Image
           style={{ width: 100, height: 100 }}
           source={require('./img01n.png')}
         />
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
    fontWeight: "bold",
    padding: 5
  },
  weatherView: {
    
  }


 });
export default GeoCalculator;