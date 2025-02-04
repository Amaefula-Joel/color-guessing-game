let colorBox = document.querySelector('#colorBox');
let colorOptions = document.querySelectorAll('.colorOption');
let gameStatus = document.querySelector('#gameStatus');
let scoreDisplay = document.querySelector('#score');
let newGameButton = document.querySelector('#newGameButton');

// store score and correct color
let score = 0;
let correctColor = '';

let failedGame = false;


let hexOption = ['A', 'B', 'C', 'D', 'E', 'F', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
console.log(hexOption.length);

// Generate random index from the hex option
let randomNumber = () => {
    return Math.floor(Math.random() * 16);
}
// Function to generate a random color
let generateRandomColor = () => {
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += hexOption[randomNumber()];
    }
    return color;
}

// Assign colors to the color options
let assignColors = () => {
    let colors = [];
    let randomIndex = Math.floor(Math.random() * 6);
    for (let i = 0; i < colorOptions.length; i++) {
        let color = generateRandomColor();
        colors.push(color);

        // assign the color to the colorOption and store it in the dataset
        colorOptions[i].style.backgroundColor = color;
        colorOptions[i].dataset.color = color;
    }

    // store the correct color
    correctColor = colors[randomIndex];

    // display the correct color
    colorBox.style.backgroundColor = correctColor;
}

function wrongAnimation() {
    gameStatus.classList.add('animate__headShake');
    setTimeout(() => {
        gameStatus.classList.remove('animate__headShake');
    }, 500);
}

// event listener for the color options
colorOptions.forEach(colorOption => {
    colorOption.addEventListener('click', () => {

        if (failedGame) {
            wrongAnimation();
            return;
        }

        // check if the clicked color is the correct color
        if (colorOption.dataset.color === correctColor) {
            score++;
            scoreDisplay.textContent = score;
            gameStatus.textContent = 'Correct!';

            assignColors();
        } else {
            wrongAnimation();

            gameStatus.textContent = 'Wrong! Start a new game';
            failedGame = true;
        }
    });
});

// Function to start a new game
let startGame = () => {
    score = 0;
    failedGame = false;
    gameStatus.textContent = 'Choose the correct option!';
    scoreDisplay.textContent = score;
    assignColors();
}

newGameButton.addEventListener('click', () => {
    startGame();
});

window.onload = startGame;
