let currentPlayer = 0;
let player0Score = 0;
let player1Score = 0;
let currentScore = 0;
let isGameActive = true;

const player0Element = document.querySelector(".player-0");
const player1Element = document.querySelector(".player-1");
const score0Element = document.getElementById("score-0");
const score1Element = document.getElementById("score-1");
const current0Element = document.getElementById("current-0");
const current1Element = document.getElementById("current-1");
const diceElement = document.querySelector(".dice");
const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

function initGame() {
  player0Score = 0;
  player1Score = 0;
  currentScore = 0;
  currentPlayer = 0;
  isGameActive = true;

  score0Element.textContent = "0";
  score1Element.textContent = "0";
  current0Element.textContent = "0";
  current1Element.textContent = "0";

  diceElement.style.display = "none";
  player0Element.classList.remove("winner");
  player1Element.classList.remove("winner");
  player0Element.classList.add("active");
  player1Element.classList.remove("active");

  document.querySelector(".player-0 .player-name").textContent = "Player 1";
  document.querySelector(".player-1 .player-name").textContent = "Player 2";
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function displayDice(diceValue) {
  diceElement.style.display = "block";
  const diceImg = diceElement.querySelector(".dice-img");

  const imagePath = `image ${diceValue}.jpg`;
  diceImg.src = imagePath;
  diceImg.alt = `Dice ${diceValue}`;
  console.log(`Showing dice image: ${imagePath}`);

  diceImg.onerror = function () {
    console.error(`Failed to load image: ${imagePath}`);
    const alternatePath = `image${diceValue}.jpg`;
    console.log(`Trying alternate path: ${alternatePath}`);
    diceImg.src = alternatePath;

    diceImg.onerror = function () {
      console.error(`Failed to load alternate image: ${alternatePath}`);
    };
  };
}

function updateCurrentScore() {
  document.getElementById(`current-${currentPlayer}`).textContent =
    currentScore;
}

function getCurrentPlayerScore() {
  return currentPlayer === 0 ? player0Score : player1Score;
}

function updatePlayerScore(score) {
  if (currentPlayer === 0) {
    player0Score = score;
    score0Element.textContent = player0Score;
  } else {
    player1Score = score;
    score1Element.textContent = player1Score;
  }
}

function switchPlayer() {
  currentScore = 0;
  updateCurrentScore();

  currentPlayer = currentPlayer === 0 ? 1 : 0;

  player0Element.classList.toggle("active");
  player1Element.classList.toggle("active");
}

function handleRoll() {
  if (!isGameActive) return;

  const dice = rollDice();
  displayDice(dice);

  if (dice === 1) {
    switchPlayer();
  } else {
    currentScore += dice;
    updateCurrentScore();
  }
}

function handleHold() {
  if (!isGameActive) return;

  const newScore = getCurrentPlayerScore() + currentScore;
  updatePlayerScore(newScore);

  if (newScore >= 100) {
    isGameActive = false;
    document.querySelector(`.player-${currentPlayer}`).classList.add("winner");
    document.querySelector(
      `.player-${currentPlayer} .player-name`
    ).textContent = `Player ${currentPlayer + 1} Wins!`;
    diceElement.style.display = "none";
  } else {
    switchPlayer();
  }
}

btnNew.addEventListener("click", initGame);
btnRoll.addEventListener("click", handleRoll);
btnHold.addEventListener("click", handleHold);

document.addEventListener("DOMContentLoaded", function () {
  initGame();

  console.log("Checking dice images...");
  const imageCheck = new Image();
  imageCheck.onload = function () {
    console.log("Dice images are accessible");
  };
  imageCheck.onerror = function () {
    console.error("Dice images may not be accessible - check file paths");
  };
  imageCheck.src = "image 1.jpg";
});
