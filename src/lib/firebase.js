
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAa5iuhhdr7DxBOjmJ-6P23z4rVccaJ1lU",
  authDomain: "chat-app-4f3d1.firebaseapp.com",
  projectId: "chat-app-4f3d1",
  storageBucket: "chat-app-4f3d1.firebasestorage.app",
  messagingSenderId: "183951095100",
  appId: "1:183951095100:web:bcad9107a2fba51b595a39"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
