import { onSnake, expandSnake } from '/js/snake.js';
import { randomGridPosition } from '/js/grid.js';    

let food = getRandomFoodPosition();
const expansionRate = 4;
let foodEat = new Audio('audio/foodeat.wav');
let currentScore = 0;
let scoreDisplay = document.getElementById("score");
export { currentScore };

export function update() {
    if (onSnake(food)) {
        expandSnake(expansionRate);
        food = getRandomFoodPosition();
        foodEat.pause();
        foodEat.play();
        currentScore = currentScore + 10;
        scoreDisplay.innerHTML = currentScore;
    }
}

export function draw(gameBoard) {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
} 

function getRandomFoodPosition() {
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}