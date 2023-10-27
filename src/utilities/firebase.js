import { useCallback, useEffect, useState } from 'react';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { connectAuthEmulator } from "firebase/auth";
import {connectDatabaseEmulator } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs5t9bOT2_TXbkulFSCXw8KuX3VJ3sqQ8",
  authDomain: "my-project-d1d8d.firebaseapp.com",
  databaseURL: "https://my-project-d1d8d-default-rtdb.firebaseio.com",
  projectId: "my-project-d1d8d",
  storageBucket: "my-project-d1d8d.appspot.com",
  messagingSenderId: "40246108797",
  appId: "1:40246108797:web:3f992b8be8d8fb4fe4c714",
  measurementId: "G-3N23FRF62T"
};


// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const database = getDatabase(firebase);
const auth = getAuth(firebase);

// if (process.env.REACT_APP_EMULATE) {
//   connectAuthEmulator(auth, "http://127.0.0.1:9099");
//   connectDatabaseEmulator(database, "127.0.0.1", 9000);

//   signInWithCredential(auth, GoogleAuthProvider.credential(
//     '{"sub": "qEvli4msW0eDz5mSVO6j3W7i8w1k", "email": "tester@gmail.com", "displayName":"Test User", "email_verified": true}'
//   ));
// }

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => (
    onValue(ref(database, path), (snapshot) => {
     setData( snapshot.val() );
    }, (error) => {
      setError(error);
    })
  ), [ path ]);

  return [ data, error ];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message = error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback((value) => {
    update(ref(database, path), value)
    .then(() => setResult(makeResult()))
    .catch((error) => setResult(makeResult(error)))
  }, [database, path]);

  return [updateData, result];
};

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider());
  };
  
  const firebaseSignOut = () => signOut(getAuth(firebase));
  
  export { firebaseSignOut as signOut };
  
  export const useAuthState = () => {
    const [user, setUser] = useState();
    
    useEffect(() => (
      onAuthStateChanged(getAuth(firebase), setUser)
    ), []);
  
    return [user];
  };