import { initializeApp } from "firebase/app";
//import { seedDatabase  } from "../seed";
import { getFirestore } from "firebase/firestore";

// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB3VtsKUvW6PANw-u8KpRQ8ZchFioVCDhA",
  authDomain: "instagram-kari.firebaseapp.com",
  projectId: "instagram-kari",
  storageBucket: "instagram-kari.appspot.com",
  messagingSenderId: "147796865772",
  appId: "1:147796865772:web:372d3586cd7f68f8ebabc9"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase);

//seedDatabase(firebase);

export { firebase, db };