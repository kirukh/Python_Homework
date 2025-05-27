const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const startBtn = document.getElementById("startBtn");

let score = 0;
let timeLeft = 60;
let gameInterval, spawnInterval;
let targets = [];

class Target {
  constructor() {
    this.radius = Math.random() * 20 + 10; // zufällige Größe 10-30px
    this.x = Math.random() * (canvas.width - 2 * this.radius) + this.radius;
    this.y = Math.random() * (canvas.height - 2 * this.radius) + this.radius;
    this.spawnTime = Date.now();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff3333";
    ctx.fill();
    ctx.closePath();
  }
}

function spawnTarget() {
  const t = new Target();
  targets.push(t);
  setTimeout(() => {
    // Entferne nach 3 Sekunden
    targets = targets.filter((item) => item !== t);
  }, 3000);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  targets.forEach((t) => t.draw());
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft <= 0) stopGame();
}

function startGame() {
  // Reset
  score = 0;
  timeLeft = 60;
  targets = [];
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  startBtn.disabled = true;

  // Intervals
  gameInterval = setInterval(draw, 1000 / 30); // 30 FPS
  spawnInterval = setInterval(spawnTarget, 800); // ca. 1 Target pro 0.8s
  setInterval(updateTimer, 1000);
}

function stopGame() {
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  startBtn.disabled = false;
  alert(`Spiel vorbei! Deine Punktzahl: ${score}`);
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  targets.forEach((t, i) => {
    const dist = Math.hypot(t.x - mx, t.y - my);
    if (dist <= t.radius) {
      score++;
      scoreEl.textContent = score;
      targets.splice(i, 1);
    }
  });
});

startBtn.addEventListener("click", startGame);
