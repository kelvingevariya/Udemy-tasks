"use strict";

//Selecting the elements
const score0Element = document.querySelector("#score--0"); //selects score of player 1
const score1Element = document.getElementById("score--1"); // selects  the  score of player 2

const player0Element = document.querySelector(".player--0");
const player1Element = document.querySelector(".player--1");

const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

const diceElement = document.querySelector(".dice"); // selects the dice image

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");


let scores, currentScore, activePlayer, playing;


const swithcPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0Element.classList.toggle("player--active");
    player1Element.classList.toggle("player--active");
};

const initial = function () {
    //Startting condition
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    score0Element.textContent = 0; //setting the scores to 0
    score1Element.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;

    diceElement.classList.add("hidden");
    player0Element.classList.add('player--active');
    player1Element.classList.remove('player--active');
    player0Element.classList.remove('player--winner');
    player1Element.classList.remove('player--winner');
    diceElement.classList.add("hidden"); // hiding the dice

}
initial();


//Rolling the dice
btnRoll.addEventListener("click", function () {
    if (playing) {
        // 1. generating the random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // 2. displaying the dice roll

        diceElement.classList.remove("hidden");
        diceElement.src = `dice-${dice}.png`;

        // 3.Check if the rolle number is 1
        if (dice !== 1) {
            // add the score to the  current score

            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent =
                currentScore;

            // change according to the player
        } else {
            //switch to the next player
            swithcPlayer();
        }
    }
});

btnHold.addEventListener("click", function () {

    if (playing) {
        //add the current score to player

        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];

        //check if the score equals to 100 finish the game
        if (scores[activePlayer] >= 20) {
            playing = false;
            diceElement.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");

        } else {
            //switch the  player
            swithcPlayer();
        }
    }
});

btnNew.addEventListener('click', initial);