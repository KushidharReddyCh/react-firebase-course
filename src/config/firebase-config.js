import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBWwRbWOQpRVy5crnQ5Y-yqzBqc2vglsGE",
  authDomain: "fir-course-1d7cb.firebaseapp.com",
  projectId: "fir-course-1d7cb",
  storageBucket: "fir-course-1d7cb.appspot.com",
  messagingSenderId: "790077493515",
  appId: "1:790077493515:web:61474b9607b75b90be920e",
  measurementId: "G-3WXNSCG5KV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);