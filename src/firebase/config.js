// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, serverTimestamp} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBThmBATS1HyUEyxqsexFbxQ-a_VZB1WOA",
  authDomain: "app-sertifika-takip-vue3.firebaseapp.com",
  projectId: "app-sertifika-takip-vue3",
  storageBucket: "app-sertifika-takip-vue3.appspot.com",
  messagingSenderId: "822029472929",
  appId: "1:822029472929:web:58ca60ce60d58f821f4ce0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const tarih = serverTimestamp();

export {auth, db,storage, tarih}