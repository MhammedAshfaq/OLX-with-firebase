
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import 'firebase/firestore';
// import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDzUwG-8TmDkBymEF2_RXqPTyiAAsI02ug",
    authDomain: "olx-new-ab2df.firebaseapp.com",
    projectId: "olx-new-ab2df",
    storageBucket: "olx-new-ab2df.appspot.com",
    messagingSenderId: "1023907323580",
    appId: "1:1023907323580:web:17c8ba4ee247ff62127ab9",
    measurementId: "G-6N72GH4B6T"
};

export default initializeApp(firebaseConfig);
export const db = getFirestore();
