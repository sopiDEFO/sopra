import { 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";

// Gestion erreurs
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

// Déjà connecté → dashboard
onAuthStateChanged(window.auth, (user) => {
  if (user) location.href = "dashboard.html";
});

// Connexion
document.getElementById("loginBtn").onclick = async () => {

  errorBox.style.display = "none";
  successBox.style.display = "none";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!email || !password) {
    showError("Veuillez entrer votre email et votre mot de passe");
    return;
  }

  try {
    await signInWithEmailAndPassword(window.auth, email, password);
    showSuccess("Connexion réussie !");
    setTimeout(() => location.href = "dashboard.html", 800);

  } catch (err) {

    if (err.code === "auth/invalid-credential") {
      showError("Email ou mot de passe incorrect");
      return;
    }

    if (err.code === "auth/user-not-found") {
      showError("Aucun compte trouvé avec cet email");
      return;
    }

    showError("Erreur : " + err.message);
  }
};

/* ---------------------------------------------------------
   🔥 MOT DE PASSE OUBLIÉ
--------------------------------------------------------- */

// Ouvrir popup
document.getElementById("forgotPasswordLink").onclick = () => {
  document.getElementById("resetPopup").style.display = "flex";
};

// Fermer popup
document.getElementById("closePopup").onclick = () => {
  document.getElementById("resetPopup").style.display = "none";
};

// Envoyer email de réinitialisation
document.getElementById("resetBtn").onclick = async () => {

  const resetEmail = document.getElementById("resetEmail").value.trim();
  const resetError = document.getElementById("resetError");
  const resetSuccess = document.getElementById("resetSuccess");

  resetError.style.display = "none";
  resetSuccess.style.display = "none";

  if (!resetEmail) {
    resetError.textContent = "Veuillez entrer votre email";
    resetError.style.display = "block";
    return;
  }

  try {
    await sendPasswordResetEmail(window.auth, resetEmail);
    resetSuccess.textContent = "Un lien de réinitialisation a été envoyé !";
    resetSuccess.style.display = "block";

  } catch (err) {

    if (err.code === "auth/user-not-found") {
      resetError.textContent = "Aucun compte trouvé avec cet email";
      resetError.style.display = "block";
      return;
    }

    resetError.textContent = "Erreur : " + err.message;
    resetError.style.display = "block";
  }
};