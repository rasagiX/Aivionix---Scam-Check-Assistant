import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCMgCSGkhihYq3CVmSrArijMRSXl3i6erY",
  authDomain: "aivionix-8f436.firebaseapp.com",
  projectId: "aivionix-8f436",
  storageBucket: "aivionix-8f436.firebasestorage.app",
  messagingSenderId: "506102523960",
  appId: "1:506102523960:web:8df5450663f91332269ecd",
  measurementId: "G-Q8QLCGG0K3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);