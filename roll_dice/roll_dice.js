
let currentPlayer = 0; 
let scores = [0, 0]; 
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
  scores = [0, 0];
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

  const diceFace = diceElement.querySelector(".dice-face");
  diceFace.innerHTML = "";
  diceFace.className = "dice-face";
  
  for (let i = 0; i < diceValue; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    diceFace.appendChild(dot);
  }

  diceFace.classList.add(`dice-${diceValue}`);
}

function switchPlayer() {

  currentScore = 0;
  document.getElementById(`current-${currentPlayer}`).textContent = "0";

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
    // Add dice to current score
    currentScore += dice;
    document.getElementById(`current-${currentPlayer}`).textContent =
      currentScore;
  }
}


function handleHold() {
  if (!isGameActive) return;

  scores[currentPlayer] += currentScore;
  document.getElementById(`score-${currentPlayer}`).textContent =
    scores[currentPlayer];


  if (scores[currentPlayer] >= 100) {

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


document.addEventListener("DOMContentLoaded", initGame);
