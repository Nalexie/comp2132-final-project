const $playerDiceOne = $("#playerDiceOne");
const $playerDiceTwo = $("#playerDiceTwo");
const $compDiceOne   = $("#compDiceOne");
const $compDiceTwo   = $("#compDiceTwo");
const $playerScore   = $("#playerScore");
const $playerTotal   = $("#playerTotal");
const $compScore     = $("#compScore");
const $compTotal     = $("#compTotal");
const $rollDice      = $("#rollDice");
const $popup         = $(".popup");
const $winner        = $("#winner");
const $loser         = $("#loser");
const $resetGame     = $(".resetGame");
const $dice          = $(".dice");
const $howTo         = $("#howTo");
const $rules         = $("#rules");
const $howToBtn      = $("#howToBtn");
const $rulesBtn      = $("#rulesBtn");
const defaultDie     = 1;
const defaultZero    = 0;
const maxRounds      = 3;
let gameround        = 0;
let playerDiceA      = 0;
let playerDiceB      = 0;
let compDiceA        = 0;
let compDiceB        = 0;
let playerTally      = 0;
let compTally        = 0;

$rollDice.on('click', rollDice);
$resetGame.on('click', resetGame);
$howToBtn.on('click', showHowTo);
$rulesBtn.on('click', showRules);

// randomize dice
function rollDice() {

    playerDiceA = Math.floor(Math.random() * 6) + 1;
    playerDiceB = Math.floor(Math.random() * 6) + 1;
    compDiceA   = Math.floor(Math.random() * 6) + 1;
    compDiceB   = Math.floor(Math.random() * 6) + 1;

    displayDice(playerDiceA, $playerDiceOne);
    displayDice(playerDiceB, $playerDiceTwo);
    displayDice(compDiceA, $compDiceOne);
    displayDice(compDiceB, $compDiceTwo);

    playerScore = scoreCard(playerDiceA, playerDiceB, $playerScore);
    compScore   = scoreCard(compDiceA, compDiceB, $compScore);
    playerTally = updateTotal(playerScore, playerTally, $playerTotal);
    compTally   = updateTotal(compScore, compTally, $compTotal);

    gameround++;
    if (gameround == maxRounds) {
        winnerRound(playerTally, compTally);
    }
}

// display dice 
function displayDice(diceNumber, JQDice) {
    JQDice.attr("src", `images/dice-${diceNumber}-face.png`);
}

// tally current
function scoreCard(diceA, diceB, JQScore) {
    score = validateScore(diceA, diceB);
    JQScore.text(score);
    return score;
}

// validate one is not found & validate doubles
function validateScore(diceA, diceB) {
    if (diceA === 1 || diceB === 1) {
        return 0;
    }
    else if (diceA === diceB) {
        return (diceA + diceB) * 2
    } else {
        return (diceA + diceB)
    }
}

// tally total
function updateTotal(score, tally, JQTotal) {
    JQTotal.text(tally + score);
    return tally + score;
}


// who won the round
function winnerRound(playerScore, compScore) {
    $rollDice.prop('disabled', true);
    if (playerScore > compScore) {
        $winner.css("display", "flex");
    } else {
        $loser.css("display", "flex");
    }

}

// reset game when new game or play again
function resetGame() {
    $rollDice.prop('disabled', false);
    gameround = defaultZero;
    playerDiceA = defaultZero;
    playerDiceB = defaultZero;
    compDiceA   = defaultZero;
    compDiceB   = defaultZero;
    playerTally = defaultZero;
    compTally   =  defaultZero;

    $playerScore.text(defaultZero);
    $playerTotal.text(defaultZero);
    $compScore.text(defaultZero);
    $compTotal.text(defaultZero);
    $popup.css("display", "none");
    $dice.attr("src", `images/dice-${defaultDie}-face.png`);
}

//instructions about the game
function showHowTo() {
    $howTo.toggleClass('show');
}

function showRules() {
    $rules.toggleClass('show');
}


