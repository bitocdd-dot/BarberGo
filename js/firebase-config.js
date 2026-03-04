import { initializeApp } from "https://www.gstatic.com";
import { getAuth } from "https://www.gstatic.com";
import { getFirestore } from "https://www.gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyB-EXEMPLO-123",
  authDomain: "barbergo-app.firebaseapp.com",
  projectId: "barbergo-app",
  storageBucket: "barbergo-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
