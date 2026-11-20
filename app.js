let gameSequence = [];
let userSequence = [];

let colors = ["red", "green", "blue", "yellow"];

let level = 0;
let started = false;

let title = document.querySelector("#level-title");
let startBtn = document.querySelector("#start-btn");

let buttons = document.querySelectorAll(".btn");

startBtn.addEventListener("click", function() {

    if (!started) {
        started = true;
        startBtn.disabled = true;
        nextLevel();
    }
});

function nextLevel() {

    userSequence = [];
    level++;

    title.innerText = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = colors[randomNumber];

    gameSequence.push(randomColor);
    let randomButton = document.querySelector("#" + randomColor);

    flashButton(randomButton);

}

function flashButton(button) {

    button.classList.add("flash");

    setTimeout(function() {
        button.classList.remove("flash");
    }, 300);

}

buttons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (!started) return;

        let clickedColor = this.id;

        userSequence.push(clickedColor);

        flashButton(this);

        checkAnswer(userSequence.length - 1);

    });

});

function checkAnswer(index) {

    if (userSequence[index] === gameSequence[index]) {

        if (userSequence.length === gameSequence.length) {

            setTimeout(function() {
                nextLevel();
            }, 800);

        }

    } else {

        gameOver();

    }

}

function gameOver() {

    title.innerText = "Game Over! Your Score: " + (level - 1);

    document.body.classList.add("game-over");

    setTimeout(function() {
        document.body.classList.remove("game-over");
    }, 300);

    resetGame();

}

function resetGame() {

    started = false;

    gameSequence = [];
    userSequence = [];

    level = 0;

    startBtn.disabled = false;
    startBtn.innerText = "Restart Game";

}
