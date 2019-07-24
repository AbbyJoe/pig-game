/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScores, activePlayer, gamePlaying;
init();

//button-roll function
const btnRoll = document.querySelector(".btn-roll");
btnRoll.addEventListener("click", () => {
    if(gamePlaying){
        // random number
        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;

        // display the result
        document.getElementById("dice-1").style.display = "block";
        document.getElementById("dice-2").style.display = "block";
        document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
        document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

        //update the round score
        if (dice1 !== 1 && dice2 !== 1) {
            //add score
            roundScores += dice1 + dice2;
            document.querySelector("#current-" + activePlayer).textContent = roundScores;
        } else {
            //next player
            nextPlayer();
        }
    }
});

const buttonHold = document.querySelector(".btn-hold");
buttonHold.addEventListener('click', () => {
    if(gamePlaying){
        //add current score to global score 
        scores[activePlayer] += roundScores;
        //update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;

        var winningScore;
        if(input){
            winningScore = input;
        } else {
            winningScore = 100;
        }
        // check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-0').textContent = "Winner!";
            document.getElementById("dice-1").style.display = "none";
            document.getElementById("dice-2").style.display = "none";
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

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";
}

const buttonNew = document.querySelector('.btn-new');
buttonNew.addEventListener('click', init)

function init() {
    scores = [0, 0]
    activePlayer = 0;
    roundScores = 0;
    gamePlaying = true;

    document.getElementById("dice-1").style.display = "none";
    document.getElementById("dice-2").style.display = "none";

    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    var input = document.querySelector('.final-score').value = "";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}
