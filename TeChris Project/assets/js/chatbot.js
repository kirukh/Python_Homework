const chatDiv = document.getElementById("chat");
const userInput = document.getElementById("userInput");
const typingIndicator = document.getElementById("typingIndicator");

// Verschieden Begrüßungen des Chatbots
const greetings = [
  "Hallo! Wie kann ich Ihnen heute helfen? Sie können mich nach den Preisen, Dienstleistungen oder Terminbuchungen fragen.",
  "Guten Tag! Was kann ich für Sie tun? Ich kann Ihnen Fragen zu Preisen, Services oder zur Terminbuchung beantworten.",
  "Willkommen! Wie darf ich Sie unterstützen? Fragen Sie mich gerne nach Preisen, Dienstleistungen oder wie Sie einen Termin buchen können.",
  "Hallo! Ich bin Ihr TeChris Bot. Was ist Ihr Anliegen? Ich kann Ihnen bei Fragen zu Preisen, Dienstleistungen oder der Terminbuchung helfen.",
  "Schön, dass Sie da sind! Sprechen Sie mich an. Ich bin hier, um Fragen zu Preisen, Services oder der Terminbuchung zu beantworten.",
];

// Verschiedene Missverständnisse, die der Chatbot ausgeben kann
const misunderstandings = [
  "Entschuldigen Sie, das habe ich nicht ganz verstanden. Könnten Sie das bitte anders formulieren? Ich kann Ihnen zu Preisen, Services oder Terminbuchungen Auskunft geben.",
  "Ich bin mir nicht sicher, was Sie meinen. Können Sie Ihre Frage präziser stellen? Versuchen Sie es mit Stichworten wie Preise, Services oder Termin buchen.",
  "Das liegt leider außerhalb meiner Fähigkeiten. Kann ich Ihnen bei etwas anderem behilflich sein, z.B. Dienstleistungen, Preisen oder der Terminbuchung ?",
  "Ich kann Ihre Anfrage nicht verarbeiten. Bitte versuchen Sie es mit einer anderen Frage, die sich auf Preise, Services oder Terminbuchungen bezieht.",
  "Hoppla, da bin ich überfragt. Vielleicht kann ich Ihnen mit Fragen zu Dienstleistungen, Preisen oder Terminbuchung weiterhelfen.?",
];

// Derzeitiger Zustand der Konversation
let conversationState = {
  currentStep: null,
  context: {},
};

// Die Hauptfunktion um Benutzeranfragen zu verarbeiten
async function handleUserMessage(message) {
  const lower = message.toLowerCase();
  let botResponse = "";

  // Setzt den aktuellen Zustand der Konversation zurück, wenn bestimmte Schlüsselwörter erkannt werden
  if (
    lower.includes("preis") ||
    lower.includes("kosten") ||
    lower.includes("wie viel") ||
    lower.includes("service") ||
    lower.includes("dienstleistung") ||
    lower.includes("was bieten sie an") ||
    lower.includes("termin") ||
    lower.includes("buchen") ||
    lower.includes("vereinbaren") ||
    lower.includes("sprechstunde")
  ) {
    conversationState.currentStep = null;
    conversationState.context = {};
  }

  // Hier beginnt die Verarbeitung der Preisfragen
  if (
    (lower.includes("preis") ||
      lower.includes("kosten") ||
      lower.includes("wie viel")) &&
    conversationState.currentStep === null
  ) {
    conversationState.currentStep = "ask_price_category";
    return "Für welche Kategorie interessieren Sie sich? Computer, Smartphone oder andere Services?";
  }

  // Hier wird die Kategorie ausgwählt, um die Preisinformationen zu liefern
  if (conversationState.currentStep === "ask_price_category") {
    if (lower.includes("computer")) {
      conversationState.currentStep = null;
      return "Computer-Reparaturen kosten ab 79€ . Dazu zählen Virenentfernung, Systeminstallation oder Hardware-Upgrades. Für detaillierte Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    if (lower.includes("smartphone")) {
      conversationState.currentStep = "ask_smartphone_price_detail";
      return "Möchten Sie den Preis für Display-Tausch, Akku-Tausch oder Ladebuchse wissen?";
    }
    if (lower.includes("andere") || lower.includes("service")) {
      conversationState.currentStep = "ask_other_price_detail";
      return "Geht es um Datenrettung, Netzwerk-Setup oder Software-Installation?";
    }
    return "Bitte geben Sie an, ob es um Computer, Smartphone oder andere Services geht.";
  }

  // Hier wird als Beispiel der Preis für Smartphone-Reparaturen konktretisiert
  if (conversationState.currentStep === "ask_smartphone_price_detail") {
    conversationState.currentStep = null;
    if (lower.includes("display")) {
      return "Ein Display-Tausch kostet ab 69€. Für detaillierte Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    if (lower.includes("akku")) {
      return "Ein Akku-Tausch kostet ab 69€. Für detaillierte Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    if (lower.includes("ladebuchse")) {
      return "Die Reparatur der Ladebuchse kostet ab 69€. Für detaillierte Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    return "Bitte sagen Sie mir, ob es um Display, Akku oder Ladebuchse geht.";
  }

  //Hier wird der Preis für andere Services wie Datenrettung, Netzwerk-Setup oder Software-Installation abgefragt
  if (conversationState.currentStep === "ask_other_price_detail") {
    conversationState.currentStep = null;
    if (lower.includes("daten")) {
      return "Datenrettung kostet ab 49€. Für detaillierte Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    if (lower.includes("netzwerk")) {
      return "Netzwerk-Setup kostet ab 49€. Für detaillierte Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    if (lower.includes("software")) {
      return "Software-Installation kostet ab 49€. Für detailliertere Informationen besuchen Sie bitte unsere <a href='pricing.html'>Preise-Seite</a>.";
    }
    return "Bitte sagen Sie mir, ob es um Datenrettung, Netzwerk-Setup oder Software-Installation geht.";
  }

  //Hier beginnt die Verarbeitung der Servicefragen
  if (
    lower.includes("service") ||
    lower.includes("dienstleistung") ||
    lower.includes("was bieten sie an")
  ) {
    return "Wir bieten eine Vielzahl von Dienstleistungen an:<ul><li>Computer-Reperaturen</li> <li>Smartphone-Reperaturen</li> <li>Datenrettung</li> <li>Netzwerk-Setup</li> <li>Software-Installation</li> <li>Individuelle Beratung</li></ul> Für eine vollständige Übersicht besuchen Sie unsere <a href='services.html'>Services-Seite</a>.";
  }

  // Hier beginnt die Verarbeitung der Terminbuchungsfragen
  if (
    lower.includes("termin") ||
    lower.includes("buchen") ||
    lower.includes("vereinbaren") ||
    lower.includes("sprechstunde")
  ) {
    return "Sie können ganz einfach einen Termin über unsere <a href='appointment.html'>Terminbuchungsseite</a> vereinbaren. Bitte wählen Sie dort Ihr gewünschtes Datum und Ihre Uhrzeit aus.";
  }

  // Hier werden die Begrüßungen verarbeitet
  const greetingKeywords = ["hallo", "hi", "hey", "guten tag", "servus"];
  if (greetingKeywords.some((keyword) => lower.includes(keyword))) {
    conversationState.currentStep = null;
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  conversationState.currentStep = null;
  return misunderstandings[
    Math.floor(Math.random() * misunderstandings.length)
  ];
}

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("chat-message", sender);
  messageElement.innerHTML = message;
  chatDiv.appendChild(messageElement);
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

// Funktion zum Senden der Nachricht, die aufgerufen wird, wenn der Benutzer eine Nachricht sendet
async function sendMessage() {
  const userText = userInput.value.trim();
  if (userText === "") {
    return;
  }

  displayMessage(userText, "user");
  userInput.value = "";

  if (typingIndicator) {
    typingIndicator.style.display = "block";
  }

  const botResponse = await handleUserMessage(userText);

  setTimeout(() => {
    if (typingIndicator) {
      typingIndicator.style.display = "none";
    }
    displayMessage(botResponse, "bot");
  }, 700);
}

// Erlaubt es Nachrichten mit Enter zu senden
userInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});

// Initial Begrüßungsnachricht anzeigen, wenn die Seite geladen wird
document.addEventListener("DOMContentLoaded", () => {
  displayMessage(
    greetings[Math.floor(Math.random() * greetings.length)],
    "bot"
  );
});
