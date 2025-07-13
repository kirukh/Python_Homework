/* TeChris Project
    Erstellt von: Stremel Christian
    E-Mail: christian.stremel@stud.th-deg.de
    Matrikelnummer: 22300994
    Version: 1.0
    Erstellt am: 01.05.2025
    Letzte Aktualisierung: 13.07.2025
*/

// Initialisierung des Terminformulars
document.addEventListener("DOMContentLoaded", () => {
  const appointmentForm = document.getElementById("appointmentForm");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  // Überprüfen, ob die Elemente existieren, bevor Event-Listener hinzugefügt werden
  if (appointmentForm && dateInput && timeInput) {
    appointmentForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Standardformularübermittlung verhindern

      const selectedDate = dateInput.value;
      const selectedTime = timeInput.value;

      // Validierung der Eingaben
      if (!selectedDate || !selectedTime) {
        alert(
          "Bitte wählen Sie ein Datum und eine Uhrzeit für Ihren Termin aus."
        );
        return;
      }
      const dateObject = new Date(selectedDate);
      const formattedDate = dateObject.toLocaleDateString("de-DE");

      // Ausgabe des Termins
      alert(
        `Ihr Termin am ${formattedDate} um ${selectedTime} Uhr wurde erfolgreich gebucht! Wir freuen uns auf Sie.`
      );
      appointmentForm.reset();
    });
  }
});
