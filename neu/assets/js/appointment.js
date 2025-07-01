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

      if (!selectedDate || !selectedTime) {
        alert(
          "Bitte wählen Sie ein Datum und eine Uhrzeit für Ihren Termin aus."
        );
        return;
      }
      const dateObject = new Date(selectedDate);
      const formattedDate = dateObject.toLocaleDateString("de-DE");

      alert(
        `Ihr Termin am ${formattedDate} um ${selectedTime} Uhr wurde erfolgreich gebucht! Wir freuen uns auf Sie.`
      );
      appointmentForm.reset();
    });
  }
});
