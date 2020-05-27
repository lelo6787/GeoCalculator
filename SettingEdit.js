import React, {useState} from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import { Dropdown} from 'react-native-material-dropdown';
import { color } from 'react-native-reanimated';

const SettingEdit = ({route, navigation}) => {
    const initialDistanceUnit = route.params.distanceUnit;
    const initialBearingUnit = route.params.bearingUnit;
    
    const [distanceUnit, setdistanceUnit] = useState(initialDistanceUnit);
    const [bearingUnit, setbearingUnit] = useState(initialBearingUnit);
    
    let dUnits = [{
        value: 'Kilometers',
      }, {
        value: 'Miles',
      }];
    
    let bUnits = [{
        value: 'Degrees',
      }, {
        value: 'Mils',
      }];

      navigation.setOptions({
        headerRight: () => (
        <TouchableOpacity
        onPress={() => 
        navigation.navigate('GeoCalculator')
      }
      >
      <Text style={styles.text}>Cancel</Text>
      </TouchableOpacity>
        ),
        headerLeft: () => (
            <TouchableOpacity
            onPress={() => {
            
            navigation.navigate('GeoCalculator', {distanceUnit,bearingUnit})}
          }
          >
          <Text style={styles.text}>Save</Text>
          </TouchableOpacity>
            ),
            
      });
    
    return (
        <View style={styles.container}>
            
                <Dropdown
                label="Distance Units"
                value ={distanceUnit}
                onChangeText = {setdistanceUnit}
                data={dUnits}
                ></Dropdown>
                <Dropdown
                  label="Bearing Units"
                  value = {bearingUnit}
                  onChangeText={setbearingUnit}
                  data={bUnits}
                ></Dropdown>
           
        </View>
    )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dfe2e7',
    flex: 1,
    padding: 10

  },
  text:{
  color: 'white',
  padding: 5
  }
 });
export default SettingEdit;