import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-gIObijMXlD9zkQ97BN5qHrhzereNZWg",
    authDomain: "moodtrack-92491.firebaseapp.com",
    projectId: "moodtrack-92491",
    storageBucket: "moodtrack-92491.appspot.com",
    messagingSenderId: "646236163467",
    appId: "1:646236163467:web:f8a896091f1bb6ccf4338e"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;

// export const db = getFirestore(app);