import React, {useState} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, SafeAreaView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Card} from 'react-native-elements';
import { Dropdown} from 'react-native-material-dropdown';
import { color } from 'react-native-reanimated';
import { CheckBox } from 'react-native-elements';

const History = ({route, navigation}) => {
    //const historyInitial = route.params;
    const history = route.params;
    const unit = "";
    const bunit ="";
    const buttonPress = (item) => {
        navigation.navigate('GeoCalculator', {item});
    }
    const renderHistory = ({item, index}) =>{
        return (
    
        <TouchableHighlight style={styles.timeStyle} onPress={()=> buttonPress(item)}>
            <View>
        <Text style={styles.itemText}>{' '} Start: {item.sourceLat}, {item.sourceLong}</Text>
        <Text style={styles.itemText}>{' '} End: {item.targetLat}, {item.targetLong}</Text>
        <Text style={styles.text}>{item.caltime}</Text>
        </View>
        </TouchableHighlight>
        
        );
    }
return(
   <View>
    <FlatList
    data={history}
    keyExtractor={item => item.id}
    renderItem={renderHistory}
    
  />
  </View>
 
)

}
const styles = StyleSheet.create({
    timeStyle: {
     borderBottomWidth: 1,
      flex: 1,
  
    },
    text:{
    textAlign: "right",
    fontStyle: 'italic',
    fontSize: 12,
    marginRight: 5
    },
    itemText: { 
        fontSize: 15,
        fontWeight: "bold",
    }
   });
export default History;