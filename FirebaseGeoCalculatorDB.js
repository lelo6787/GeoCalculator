import * as firebase from 'firebase';
import 'firebase/database';
import {firebaseConfig } from './FirebaseConfig.js';
import { lessOrEq } from 'react-native-reanimated';
export function initFireBaseDB()
{
    firebase.initializeApp(firebaseConfig);
}
export function writeData(data) {
    firebase.database().ref(`geocalculator`).push(data);

}
export function setupDataListener(updateItems) {
    firebase
    .database()
    .ref(`geocalculator/`)
    .on('value', (snapshot) => {
        console.log('data listener fire up with : ', snapshot);
        const newArr = [];
        if(snapshot?.val()){
            const items = snapshot.val();
            Object.keys(items).map((key, index) => {
                console.log(key, '||', index, '||', items[key]);
                newArr.push({ ...items[key], id: key });
              });
        
            updateItems(newArr);
        }else {
            updateItems([]);
        }
    });
}