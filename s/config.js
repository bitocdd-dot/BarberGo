import { initializeApp } from "https://www.gstatic.com";
import { getAuth } from "https://www.gstatic.com";
const firebaseConfig = { apiKey: "AIzaSyB", authDomain: "barbergo.firebaseapp.com", projectId: "barbergo" };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
