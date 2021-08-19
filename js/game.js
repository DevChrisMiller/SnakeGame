//game variables
let lastRenderTime = 0;
let gameOver = false;

//grid variables
const gridMax = 21;
const gridMin = 1;

//input variables
let inputDirection = { x: 0, y: 0};
let lastInputDirection = { x: 0, y: 0};

//snake variables
const snakeSpeed = 6;
const snakeBody = [{x: 11, y:11}];  
let newSegments = 0;

//food variables
let food = getRandomFoodPosition();
const expansionRate = 4;
let currentScore = 0;

//audio
let foodEat = new Audio('audio/foodeat.wav');
let GOSound = new Audio('audio/gameover.wav');



// game
function main(currentTime) {
    if (gameOver) {
        GOSound.play();
        alertify.confirm('Game Over!', 'Your Score: ' + currentScore + '<br><br>Play Again?',
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
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}


// grid
function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * gridMax) + 1,
        y: Math.floor(Math.random() * gridMax) + 1
    }
}

function outsideGrid(position) {
    return (
        position.x < gridMin || position.x > gridMax ||
        position.y < gridMin || position.y > gridMax
    )
}


//input
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !==0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (lastInputDirection.y !==0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case 'ArrowRight':
            if (lastInputDirection.x !==0) break;
            inputDirection = { x: 1, y: 0 };
            break;
        case 'ArrowLeft':
            if (lastInputDirection.x !==0) break;
            inputDirection = { x: -1, y: 0 };
            break;
    }
})

function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}


//snake
function updateSnake() {
    addSegments();
   const inputDirection = getInputDirection();
   for (let i = snakeBody.length - 2; i >= 0; i--) {
       snakeBody[i + 1] = { ...snakeBody[i] }
   }

   snakeBody[0].x += inputDirection.x; 
   snakeBody[0].y += inputDirection.y;

}

function drawSnake(gameBoard) {
   snakeBody.forEach(segment => {
       const snakeElement = document.createElement('div');
       snakeElement.style.gridRowStart = segment.y;
       snakeElement.style.gridColumnStart = segment.x;
       snakeElement.classList.add('snake');
       gameBoard.appendChild(snakeElement);

   })
} 

function expandSnake(amount) {
   newSegments += amount;
}

function onSnake(position, { ignoreHead = false } = {}) {
   return snakeBody.some((segment, index) => {
       if (ignoreHead && index === 0) return false;
       return equalPositions(segment, position)
   })
}

function getSnakeHead() {
   return snakeBody[0];
}

function snakeIntersection() {
   return onSnake(snakeBody[0], { ignoreHead: true });
}

function equalPositions(pos1, pos2) {
   return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
   for (let i = 0; i< newSegments; i++) {
       snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
   }

   newSegments = 0;
}


//food
function updateFood() {
    if (onSnake(food)) {
        expandSnake(expansionRate);
        food = getRandomFoodPosition();
        foodEat.pause();
        foodEat.play();
        currentScore = currentScore + 10;
        const scoreDisplay = document.getElementById("score");
        scoreDisplay.innerHTML = currentScore;
    }
}

function drawFood(gameBoard) {
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