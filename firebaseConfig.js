// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDVnEeNw2FmMNZDOmjBsaF97577kJpfQnQ",
    authDomain: "chatta-ab5e1.firebaseapp.com",
    projectId: "chatta-ab5e1",
    storageBucket: "chatta-ab5e1.appspot.com",
    messagingSenderId: "690368421169",
    appId: "1:690368421169:web:b60ffa931a6031d9bb6410",
    measurementId: "G-Q0YS6S7BPY"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app)

module.exports = { auth, firestore, createUserWithEmailAndPassword, storage }