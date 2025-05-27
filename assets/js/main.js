document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.querySelector("nav ul");
  const darkToggle = document.getElementById("darkmode-toggle");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("darkmode");
  });
});
