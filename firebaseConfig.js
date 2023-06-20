import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore'

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCxMz2Z5GCfSbiWMmwdrNkqUBBuIVI7FIE",
    authDomain: "chatta-mobile.firebaseapp.com",
    projectId: "chatta-mobile",
    storageBucket: "chatta-mobile.appspot.com",
    messagingSenderId: "307824962784",
    appId: "1:307824962784:web:fba599a0c5154689723485",
    measurementId: "G-0XY8X0J4N8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app)

export { auth, firestore, storage }
