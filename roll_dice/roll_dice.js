
let currentPlayer = 0; // 0 for Player 1, 1 for Player 2
let scores = [0, 0]; // Total scores for both players
let currentScore = 0; // Current round score
let isGameActive = true; // Game state

// DOM elements
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

// Initialize game
function initGame() {
  scores = [0, 0];
  currentScore = 0;
  currentPlayer = 0;
  isGameActive = true;

  // Reset scores display
  score0Element.textContent = "0";
  score1Element.textContent = "0";
  current0Element.textContent = "0";
  current1Element.textContent = "0";

  // Hide dice
  diceElement.style.display = "none";

  // Remove winner class and reset active player
  player0Element.classList.remove("winner");
  player1Element.classList.remove("winner");
  player0Element.classList.add("active");
  player1Element.classList.remove("active");

  // Reset player names
  document.querySelector(".player-0 .player-name").textContent = "Player 1";
  document.querySelector(".player-1 .player-name").textContent = "Player 2";
}

// Generate random dice roll (1-6)
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Display dice with correct number of dots
function displayDice(diceValue) {
  diceElement.style.display = "block";

  // Clear existing dots
  const diceFace = diceElement.querySelector(".dice-face");
  diceFace.innerHTML = "";
  diceFace.className = "dice-face";

  // Add dots based on dice value
  for (let i = 0; i < diceValue; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    diceFace.appendChild(dot);
  }

  // Add specific class for styling
  diceFace.classList.add(`dice-${diceValue}`);
}

// Switch to next player
function switchPlayer() {
  // Reset current score
  currentScore = 0;
  document.getElementById(`current-${currentPlayer}`).textContent = "0";

  // Switch active player
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  // Update UI
  player0Element.classList.toggle("active");
  player1Element.classList.toggle("active");
}

// Handle dice roll
function handleRoll() {
  if (!isGameActive) return;

  // Generate random dice roll
  const dice = rollDice();

  // Display dice
  displayDice(dice);

  // Check if rolled 1
  if (dice === 1) {
    // Player loses current score and turn switches
    switchPlayer();
  } else {
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current-${currentPlayer}`).textContent =
      currentScore;
  }
}

// Handle hold score
function handleHold() {
  if (!isGameActive) return;

  // Add current score to total score
  scores[currentPlayer] += currentScore;
  document.getElementById(`score-${currentPlayer}`).textContent =
    scores[currentPlayer];

  // Check if player won (score >= 100)
  if (scores[currentPlayer] >= 100) {
    // Current player wins
    isGameActive = false;
    document.querySelector(`.player-${currentPlayer}`).classList.add("winner");
    document.querySelector(
      `.player-${currentPlayer} .player-name`
    ).textContent = `Player ${currentPlayer + 1} Wins!`;
    diceElement.style.display = "none";
  } else {
    // Switch to next player
    switchPlayer();
  }
}

// Event listeners
btnNew.addEventListener("click", initGame);
btnRoll.addEventListener("click", handleRoll);
btnHold.addEventListener("click", handleHold);

// Initialize game when page loads
document.addEventListener("DOMContentLoaded", initGame);
