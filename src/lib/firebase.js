import { initializeApp } from "firebase/app";
//import { seedDatabase  } from "../seed";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

// firebase config
const firebaseConfig = {
  apiKey: ,
  authDomain: ,
  projectId: ,
  storageBucket: ,
  messagingSenderId: ,
  appId: 
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);
const auth = getAuth(firebase);

//seedDatabase(firebase);

export { firebase, db, auth };
