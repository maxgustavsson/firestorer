import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAVGs7w1r5ywzvxaf6UstD6xPSr_m-UVkw",
    authDomain: "react-625ad.firebaseapp.com",
    projectId: "react-625ad",
    storageBucket: "react-625ad.appspot.com",
    messagingSenderId: "695828819512",
    appId: "1:695828819512:web:8c561f9f1df4e7fe69c0cd"
}
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
  
export default db;