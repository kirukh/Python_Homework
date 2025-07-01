document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginMsg = document.getElementById("loginMsg");

  if (loginForm && usernameInput && passwordInput && loginMsg) {
    // Sicherstellen, dass alle Elemente existieren
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Standardformularübermittlung verhindern

      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();

      // Einfache Validierung (vereinfachtes Beispiel)
      if (username === "user" && password === "password") {
        // Beispiel-Anmeldedaten
        loginMsg.textContent =
          "Login erfolgreich! Sie werden weitergeleitet...";
        loginMsg.style.color = "green";
        setTimeout(() => {
          window.location.href = "index.html"; // Weiterleitung zur Startseite
        }, 1500); // nach 1,5 Sekunden
      } else {
        loginMsg.textContent =
          "Ungültiger Benutzername oder Passwort. Bitte versuchen Sie es erneut.";
        loginMsg.style.color = "red";
      }
      // Nachricht nach 5 Sekunden wieder entfernen
      setTimeout(() => {
        loginMsg.textContent = "";
      }, 5000);
    });
  }
});
