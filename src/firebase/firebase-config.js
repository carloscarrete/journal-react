import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDcyP1ZW1mZ55bgYARWpS9wpz7P6beZKT8",
    authDomain: "journal-app-react-e8523.firebaseapp.com",
    projectId: "journal-app-react-e8523",
    storageBucket: "journal-app-react-e8523.appspot.com",
    messagingSenderId: "698972597391",
    appId: "1:698972597391:web:cba9d85a432a062c3514fa"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();


  const db = getFirestore(app);
  const googleAuthProvider = new GoogleAuthProvider();
   
   export {
       db,
       googleAuthProvider,
       signInWithPopup,
       auth,
       createUserWithEmailAndPassword,
       updateProfile
   }

