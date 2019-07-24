/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// const diceButton = document.querySelector(".btn-roll");

// diceButton.addEventListener('click', () => {
//     console.log("hello")
// })

// document.querySelector("#current-" + activePlayer).textContent = dice;

var scores, roundScores, activePlayer, gamePlaying;
init();

var lastDice;

//button-roll function
const btnRoll = document.querySelector(".btn-roll");

btnRoll.addEventListener("click", () => {
    if(gamePlaying){
        // random number
        const dice = Math.floor(Math.random() * 6) + 1;

        // display the result
        const diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "dice-" + dice + ".png";

        //update the round score
        if(dice === 6 && lastDice === 6){
            //palyer looses score
            scores[activePlayer] = 0;
            document.querySelector("#score-" + activePlayer).textContent = '0';
            nextPlayer();
        } else if (dice !== 1) {
            //add score
            roundScores += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScores;
        } else {
            //next player
            nextPlayer();
        }
        lastDice = dice;
    }
});

const buttonHold = document.querySelector(".btn-hold");
buttonHold.addEventListener('click', () => {
    if(gamePlaying){
        //add current score to global score 
        scores[activePlayer] += roundScores;
        //update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer]

        // check if player won the game
        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-0').textContent = "Winner!";
            document.querySelector('.dice').style.display = "none";
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //next player
            nextPlayer();
        }
    }
     
})

// function for new player
function nextPlayer (){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScores = 0;

    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";

    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");

    document.querySelector(".dice").style.display = "none";
}

const buttonNew = document.querySelector('.btn-new');
buttonNew.addEventListener('click', init)

function init() {
    scores = [0, 0]
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;

    document.querySelector(".dice").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
