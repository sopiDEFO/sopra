import { 
  createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");

function showError(message) {
  errorBox.textContent = message;
  errorBox.style.display = "block";
  errorBox.classList.add("shake");
  setTimeout(() => errorBox.classList.remove("shake"), 300);
}

function showSuccess(message) {
  successBox.textContent = message;
  successBox.style.display = "block";
}
const db = getFirestore(window.app);

// Inputs
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const birthdate = document.getElementById("birthdate");
const gender = document.getElementById("gender");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const ageDisplay = document.getElementById("ageDisplay");

let userAge = 0;

// Téléphone : chiffres uniquement
phone.addEventListener("input", () => {
  phone.value = phone.value.replace(/\D/g, "");
});

// Calcul âge
birthdate.oninput = () => {
  const birth = new Date(birthdate.value);
  const today = new Date();

  userAge = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) userAge--;

  ageDisplay.textContent = birthdate.value ? "Âge : " + userAge + " ans" : "";
  ageDisplay.style.color = userAge < 13 ? "red" : "#4f46e5";
};

// Création du compte
document.getElementById("registerBtn").onclick = async () => {

  errorBox.style.display = "none";
  successBox.style.display = "none";

  if (!firstname.value || !lastname.value || !email.value || !password.value) {
    showError("Veuillez remplir tous les champs obligatoires");
    return;
  }

  if (phone.value.length !== 10) {
    showError("Le numéro de téléphone doit contenir exactement 10 chiffres");
    return;
  }

  if (password.value !== confirmPassword.value) {
    showError("Les mots de passe ne correspondent pas");
    return;
  }

  if (userAge < 13) {
    showError("Vous devez avoir au moins 13 ans pour créer un compte");
    return;
  }

  if (!terms.checked) {
    showError("Vous devez accepter les conditions d'utilisation");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(window.auth, email.value, password.value);

    await setDoc(doc(db, "users", userCred.user.uid), {
      firstname: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      birthdate: birthdate.value,
      age: userAge,
      gender: gender.value,
      createdAt: new Date()
    });

    showSuccess("Compte créé avec succès !");
    setTimeout(() => location.href = "login.html", 1000);

  } catch (err) {

    if (err.code === "auth/email-already-in-use") {
      showError("Cet email est déjà utilisé. Essayez de vous connecter.");
      return;
    }

    showError("Erreur : " + err.message);
  }
};