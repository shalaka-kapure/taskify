// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZ-B1Etzetf7bef9QrykItTSgVJO8tGkc",
  authDomain: "to-do-list-app-d239c.firebaseapp.com",
  projectId: "to-do-list-app-d239c",
  storageBucket: "to-do-list-app-d239c.firebasestorage.app",
  messagingSenderId: "913727481857",
  appId: "1:913727481857:web:fa6ce5cafbd16aa7327800"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;