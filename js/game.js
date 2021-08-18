import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection } from '/js/snake.js';
import { update as updateFood, draw as drawFood, currentScore as gameScore} from '/js/food.js';
import { outsideGrid } from '/js/grid.js';

let lastRenderTime = 0;
let gameOver = false;
let GOSound = new Audio('audio/gameover.wav');

const gameBoard = document.getElementById('game-board')


function main(currentTime) {
    if (gameOver) {
        GOSound.play();
        alertify.confirm('Game Over!', 'Your Score: ' + gameScore + '<br><br>Play Again?',
        function(){ 
            window.location = '/';
         },
         function(){
            return;
        });
        return;
    }
    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) {
        return;
    }

    lastRenderTime = currentTime;

    update();
    draw();

}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}