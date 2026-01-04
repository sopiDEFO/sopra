import { 
  onAuthStateChanged,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  getDoc,
  updateDoc
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

const pFirstname = document.getElementById("pFirstname");
const pLastname = document.getElementById("pLastname");
const pPhone = document.getElementById("pPhone");
const pGender = document.getElementById("pGender");
const pBirthdate = document.getElementById("pBirthdate");
const pEmail = document.getElementById("pEmail");

const profileAvatar = document.getElementById("profileAvatar");
const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");

let currentUser = null;

// Charger les données
onAuthStateChanged(window.auth, async (user) => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  currentUser = user;

  try {
    const snap = await getDoc(doc(db, "users", user.uid));

    if (!snap.exists()) {
      showError("Impossible de charger vos informations.");
      return;
    }

    const data = snap.data();

    pFirstname.value = data.firstname || "";
    pLastname.value = data.lastname || "";
    pPhone.value = data.phone || "";
    pGender.value = data.gender || "";
    pBirthdate.value = data.birthdate || "";
    pEmail.value = data.email || "";

    // Header
    const fullName = `${data.firstname || ""} ${data.lastname || ""}`.trim() || "Utilisateur Sopi";
    profileName.textContent = fullName;
    profileEmail.textContent = data.email || "";

    // Avatar = initiales
    if (fullName) {
      const parts = fullName.split(" ").filter(Boolean);
      const initials = parts.length >= 2
        ? (parts[0][0] + parts[1][0]).toUpperCase()
        : parts[0][0].toUpperCase();
      profileAvatar.textContent = initials;
    } else {
      profileAvatar.textContent = "?";
    }

  } catch (err) {
    showError("Erreur lors du chargement du profil");
  }
});

// Sauvegarder profil
document.getElementById("saveProfileBtn").onclick = async () => {
  errorBox.style.display = "none";
  successBox.style.display = "none";

  if (!currentUser) return;

  if (!pFirstname.value || !pLastname.value) {
    showError("Prénom et nom sont obligatoires");
    return;
  }

  if (pPhone.value && pPhone.value.replace(/\D/g, "").length !== 10) {
    showError("Le numéro de téléphone doit contenir 10 chiffres");
    return;
  }

  try {
    await updateDoc(doc(db, "users", currentUser.uid), {
      firstname: pFirstname.value,
      lastname: pLastname.value,
      phone: pPhone.value,
      gender: pGender.value,
      birthdate: pBirthdate.value
    });

    showSuccess("Profil mis à jour avec succès");

  } catch (err) {
    showError("Erreur lors de la mise à jour du profil");
  }
};

// Changer mot de passe
document.getElementById("changePasswordBtn").onclick = async () => {
  errorBox.style.display = "none";
  successBox.style.display = "none";

  if (!currentUser) return;

  const oldPassword = document.getElementById("oldPassword").value;
  const newPassword = document.getElementById("newPassword").value;
  const newPasswordConfirm = document.getElementById("newPasswordConfirm").value;

  if (!oldPassword || !newPassword || !newPasswordConfirm) {
    showError("Veuillez remplir tous les champs de mot de passe");
    return;
  }

  if (newPassword.length < 6) {
    showError("Le nouveau mot de passe doit contenir au moins 6 caractères");
    return;
  }

  if (newPassword !== newPasswordConfirm) {
    showError("Les nouveaux mots de passe ne correspondent pas");
    return;
  }

  try {
    const cred = EmailAuthProvider.credential(currentUser.email, oldPassword);
    await reauthenticateWithCredential(currentUser, cred);
    await updatePassword(currentUser, newPassword);

    showSuccess("Mot de passe modifié avec succès");

  } catch (err) {
    if (err.code === "auth/invalid-credential") {
      showError("Ancien mot de passe incorrect");
      return;
    }
    showError("Erreur lors du changement de mot de passe");
  }
};

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