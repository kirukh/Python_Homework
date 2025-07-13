/* TeChris Project
    Erstellt von: Stremel Christian
    E-Mail: christian.stremel@stud.th-deg.de
    Matrikelnummer: 22300994
    Version: 1.0
    Erstellt am: 01.05.2025
    Letzte Aktualisierung: 13.07.2025
*/

// Dieses Skript wird ausgeführt, sobald die Webseite vollständig geladen ist.
document.addEventListener("DOMContentLoaded", function () {
  // Logik für die Navigation und das Menü
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("open");
      mobileNav.classList.toggle("open");
    });
  }

  // Logik für den Kontaktbereich
  const contactForm = document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message");

  if (contactForm && formMessage) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Standardformularübermittlung verhindern

      formMessage.textContent = "Vielen Dank! Ihre Nachricht wurde gesendet.";
      formMessage.style.color = "green"; // Erfolgreiche Nachrichten grün
      contactForm.reset(); // Formularfelder leeren

      // Nachricht nach 5 Sekunden wieder entfernen
      setTimeout(() => {
        formMessage.textContent = "";
      }, 5000);
    });
  }
});

// Logik für die mobile Navigation
// Diese Funktion ermöglicht das Öffnen und Schließen des mobilen Menüs
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const allNavLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("no-scroll");
    });

    // Schließt die mobile Nav, wenn ein Link angeklickt wird
    allNavLinks.forEach((link) => {
      link.addEventListener("click", function () {
        if (mobileNav.classList.contains("active")) {
          mobileNav.classList.remove("active");
          menuToggle.classList.remove("active");
          document.body.classList.remove("no-scroll");
        }
      });
    });
  }
});

// Logik für die Navigation
document.addEventListener("DOMContentLoaded", function () {
  // Holen Sie sich alle Navigationslinks
  const navLinks = document.querySelectorAll(".nav-links a, .mobile-nav a");

  // Holen Sie sich den aktuellen Pfadnamen der URL (z.B. "/services.html")
  const currentPath = window.location.pathname.split("/").pop(); // Gibt "index.html", "services.html" etc. zurück

  const activePage = currentPath === "" ? "index.html" : currentPath;

  // Fügen Sie die Klasse "active" zum Link hinzu, der der aktuellen Seite entspricht
  navLinks.forEach((link) => {
    link.classList.remove("active");

    // Überprüfen Sie, ob die href des Links mit der aktuellen Seite übereinstimmt
    const linkPath = link.getAttribute("href").split("/").pop();

    if (linkPath === activePage) {
      link.classList.add("active");
    }
  });
});
