import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

function validateInputs() {
  if (emailInput.value.trim() === "") {
    alert("Veuillez entrer un email");
    return false;
  }
  if (passwordInput.value.trim() === "") {
    alert("Veuillez entrer un mot de passe");
    return false;
  }
  return true;
}

document.getElementById("loginBtn").onclick = async () => {
  if (!validateInputs()) return;

  try {
    await signInWithEmailAndPassword(window.auth, emailInput.value, passwordInput.value);
    alert("Connexion réussie");
  } catch (err) {
    alert("Erreur : " + err.message);
  }
};

document.getElementById("registerBtn").onclick = async () => {
  if (!validateInputs()) return;

  try {
    await createUserWithEmailAndPassword(window.auth, emailInput.value, passwordInput.value);
    alert("Compte créé !");
  } catch (err) {
    alert("Erreur : " + err.message);
  }
};