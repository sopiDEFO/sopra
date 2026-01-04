import { 
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const db = getFirestore(window.app);

const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");

function showError(message) {
  if (!errorBox) return;
  errorBox.textContent = message;
  errorBox.style.display = "block";
  errorBox.classList.add("shake");
  setTimeout(() => errorBox.classList.remove("shake"), 300);
}

function showSuccess(message) {
  if (!successBox) return;
  successBox.textContent = message;
  successBox.style.display = "block";
}

onAuthStateChanged(window.auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      const data = snap.data();
      document.getElementById("welcomeText").textContent =
        `Bienvenue, ${data.firstname} ${data.lastname} 👋`;
    } else {
      document.getElementById("welcomeText").textContent = "Bienvenue !";
    }

  } catch (err) {
    showError("Impossible de charger vos informations.");
  }
});

// Déconnexion mobile
const logoutMobile = document.getElementById("logoutBtnMobile");
if (logoutMobile) {
  logoutMobile.onclick = () => {
    signOut(window.auth).then(() => {
      location.href = "login.html";
    });
  };
}

// Déconnexion desktop
const logoutDesktop = document.getElementById("logoutBtnDesktop");
if (logoutDesktop) {
  logoutDesktop.onclick = () => {
    signOut(window.auth).then(() => {
      location.href = "login.html";
    });
  };
}