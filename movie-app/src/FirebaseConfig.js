// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "AIzaSyBwka-DQZbbCFHMIAU7HtIE7JuiAkgTG94",
  authDomain: "movies-app-4d7e4.firebaseapp.com",
  projectId: "movies-app-4d7e4",
  storageBucket: "movies-app-4d7e4.appspot.com",
  messagingSenderId: "785036214021",
  appId: "1:785036214021:web:4964f9aa0460c41605816c",
  measurementId: "G-NN11CR3263"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const db = getFirestore(app);

console.log(db);
export {auth, provider,db};

