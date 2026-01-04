import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { 
  getAuth,
  setPersistence,
  browserLocalPersistence
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyD2ZcsKLMyTltGvQOzm8P7f44AnC3ygaiQ",
  authDomain: "sopi-6e595.firebaseapp.com",
  projectId: "sopi-6e595",
  storageBucket: "sopi-6e595.firebasestorage.app",
  messagingSenderId: "411471868768",
  appId: "1:411471868768:web:612fdb9571702410092405"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔥 Persistance : rester connecté même après fermeture
setPersistence(auth, browserLocalPersistence);

window.app = app;
window.auth = auth;