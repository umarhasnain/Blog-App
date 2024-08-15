import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query, where, 
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDO-478xaltJCjezpfRB-OU2g_4kXcRjRU",
  authDomain: "blog-app0.firebaseapp.com",
  projectId: "blog-app0",
  storageBucket: "blog-app0.appspot.com",
  messagingSenderId: "509053694593",
  appId: "1:509053694593:web:06f42a5eea14ed6ebd1380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  app,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getFirestore,
  db,
  doc,
  setDoc,
  collection,
  addDoc,
  onSnapshot,
  query, where, 
  onAuthStateChanged
 
};
