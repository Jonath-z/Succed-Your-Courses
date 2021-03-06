import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUQUET}`,
  messagingSenderId:`${process.env.REACT_APP_FIREBASE_MESSAGING_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
};

firebase.initializeApp(firebaseConfig);
// console.log(process.env);
export const auth = firebase.auth();
export const storageDB = firebase.storage()
export const realTimeDB = firebase.database();
export const fireStoreDB = firebase.firestore();
export default firebase
