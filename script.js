"use strict";
//Selecting elements
const player0EL = document.querySelector(".player--0");
const player1EL = document.querySelector(".player--1");
const score0EL = document.querySelector("#score--0"); //# is the ID selector
const score1EL = document.getElementById("score--1"); //works the samme as above
const currentScore0EL = document.querySelector("#current--0");
const currentScore1EL = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function () {
  player0EL.classList.remove("player--winner");
  player1EL.classList.remove("player--winner");
  //2) reset scores all score variables
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.querySelector("#score--0").textContent = 0; //could have used variables
  document.querySelector("#score--1").textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  //3) set playing === true
  playing = true;
  //4) reset active player
  player0EL.classList.add("player--active");
  activePlayer = 0;
};
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0; //if active player = 0, set = 1, else set = 0

  player0EL.classList.toggle("player--active"); //toggle adds the class if its not active, and removes if it is active
  player1EL.classList.toggle("player--active");
};

//Starting conditions
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add("hidden");

//Rolling dice functionality

btnRoll.addEventListener("click", function () {
  if (playing === true) {
    //1) Generarte a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2) Display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; //dynacmically choose image to load
    //3) check if dice = 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchPlayer();
    }
    //a) if true switch to other player
    //b) if false add current roll to total turn total
  }
});

btnHold.addEventListener("click", function () {
  if (playing === true) {
    //1) add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2) check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add("hidden");
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`) //make sure to use the selector with queryselector
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
    //a) finish game
    //b) switch player
  }
});
btnNew.addEventListener("click", init);
