// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAELo-Eaia3W6tWnr9mGCBvNiKTjwL13XA",
  authDomain: "distribution-portal-d5f11.firebaseapp.com",
  databaseURL: "https://distribution-portal-d5f11-default-rtdb.firebaseio.com",
  projectId: "distribution-portal-d5f11",
  storageBucket: "distribution-portal-d5f11.appspot.com",
  messagingSenderId: "594842754773",
  appId: "1:594842754773:web:9cbe53f76c629f0cdb8c5c",
};

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
const db = getFirestore(app);
const auth = getAuth(app);
export { auth };
export default db;
