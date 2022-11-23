'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

const diceElement = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldDice = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

// Starting conditions
let score, currentScore, activePlayer, playing;

const startConditions = function () {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceElement.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  document.getElementById(`name--0`).innerText = 'Player 1';
  document.getElementById(`name--1`).innerText = 'Player 2';
};

// Starting the game
startConditions();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice
btnRollDice.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;

    // Check if roll is 1
    if (diceNumber !== 1) {
      // Add dice to current score
      currentScore += diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch active player
      switchPlayer();
    }
  }
});

// Hold Functionality
btnHoldDice.addEventListener('click', function () {
  if (playing) {
    // Add currentScore to score
    score[activePlayer] += currentScore;

    // display score
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    // check if score is at least 100
    if (score[activePlayer] >= 100) {
      // finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document.getElementById(`name--${activePlayer}`).innerText =
        activePlayer === 0 ? 'Player 1 wins 🏆' : 'Player 2 wins 🏆';

      diceElement.classList.add('hidden');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// New Game button Functionality
btnNewGame.addEventListener('click', startConditions);
