import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAw26FM-MA-cnJPuPLwIVZAMUMrdYDJbNE",
  authDomain: "elevatebox-60cbf.firebaseapp.com",
  projectId: "elevatebox-60cbf",
  storageBucket: "elevatebox-60cbf.appspot.com",
  messagingSenderId: "595889443671",
  appId: "1:595889443671:web:45a17f7cdb83dcc5cae412",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
