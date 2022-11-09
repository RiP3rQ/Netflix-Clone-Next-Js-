// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg2_7l3mTYjTC5MvF8kag_F5XlTeuLy1U",
  authDomain: "netflix-clone-58a92.firebaseapp.com",
  projectId: "netflix-clone-58a92",
  storageBucket: "netflix-clone-58a92.appspot.com",
  messagingSenderId: "558643040914",
  appId: "1:558643040914:web:6708740771a572d5e94c4b",
  measurementId: "G-7RJZBKZZMB"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }