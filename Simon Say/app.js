let gameSeq = [];
let userSeq = [];
const btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let soundOn = true;

const h2 = document.querySelector("h2");
const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const restartBtn = document.getElementById("restart");
const soundBtn = document.getElementById("toggle-sound");
const modeBtn = document.getElementById("toggle-mode");

const buttonSound = new Audio("button-press.mp3");
const gameOverSound = new Audio("game-over.mp3");

highScoreDisplay.innerText = `High Score: ${highScore}`;

document.addEventListener("keypress", () => {
  if (!started) {
    started = true;
    levelUp();
  }
});

function playSound(sound) {
  if (soundOn) {
    sound.currentTime = 0;
    sound.play();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => btn.classList.remove("flash"), 300);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => btn.classList.remove("userflash"), 300);
}

function levelUp() {
  userSeq = [];
  level++;
  score++;
  h2.innerText = `Level ${level}`;
  scoreDisplay.innerText = `Score: ${score}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.getElementById(randColor);
  gameSeq.push(randColor);
  gameFlash(randBtn);
  playSound(buttonSound);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    playSound(gameOverSound);
    document.body.style.backgroundColor = "#e74c3c";
    setTimeout(() => {
      document.body.style.backgroundColor = "";
    }, 200);
    h2.innerHTML = `Game Over! Score: <b>${score}</b> <br> Press any key to restart.`;

    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
      highScoreDisplay.innerText = `High Score: ${highScore}`;
    }

    resetGame();
  }
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!started) return;
    userFlash(btn);
    let userColor = btn.id;
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
  });
});

function resetGame() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
  score = 0;
  scoreDisplay.innerText = `Score: 0`;
  restartBtn.classList.remove("hidden");
}

restartBtn.addEventListener("click", () => {
  h2.innerText = "Press any key to start";
  restartBtn.classList.add("hidden");
});

soundBtn.addEventListener("click", () => {
  soundOn = !soundOn;
  soundBtn.innerText = soundOn ? "🔊 Sound On" : "🔇 Sound Off";
});

modeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  modeBtn.innerText = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
