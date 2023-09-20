// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY-d-KzFZvBeQe7KbprQHMSabcwHcbARU",
  authDomain: "redrag-23e43.firebaseapp.com",
  projectId: "redrag-23e43",
  storageBucket: "redrag-23e43.appspot.com",
  messagingSenderId: "948609677388",
  appId: "1:948609677388:web:7b9d7f527afa2aef151ce9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
