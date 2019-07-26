import firebase from 'firebase/app';
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDrypMCKrNMJFxsOeRlMq3pAREocujiO3I",
    authDomain: "teamchillipadi.firebaseapp.com",
    databaseURL: "https://teamchillipadi.firebaseio.com",
    projectId: "teamchillipadi",
    storageBucket: "",
    messagingSenderId: "1012436947346",
    appId: "1:1012436947346:web:c0c22a89c790326e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();
export default firebase;