let colorBox = document.querySelector('#colorBox');
let colorOptions = document.querySelectorAll('.colorOption');
let gameStatus = document.querySelector('#gameStatus');
let scoreDisplay = document.querySelector('#score');
let newGameButton = document.querySelector('#newGameButton');

// store score and correct color
let score = 0;
let correctColor = '';

let successMessages = ['Correct! Next One!!', 'You are a genius!', 'You are on fire!', 'You are a pro!', 'You are a champ!', 'You are a legend!', 'You are a master!', 'You are a wizard!', 'You are a king!', 'You are a queen!', 'You are a god!', 'You are a goddess!', 'You are a superhero!', 'You are a superwoman!', 'You are a superman!', 'You are a superhuman!', 'You are a superbeing!', 'You are a superpower!', 'You are a superforce!', 'You are a supermind!', 'You are a superbrain!', 'You are a supergenius!', 'You are a superlegend!', 'You are a supermaster!', 'You are a superchamp!', 'You are a superking!', 'You are a superqueen!', 'You are a supergod!', 'You are a supergoddess'];

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

function handleStatus(status) {
    
    gameStatus.classList.remove('text-red-600', 'text-green-500');
    
    if (status === 'correct') {

        let randomIndex = Math.floor(Math.random() * successMessages.length);

        gameStatus.textContent = successMessages[randomIndex];

        gameStatus.classList.add('animate__tada', 'text-green-500');
        setTimeout(() => {
            gameStatus.classList.remove('animate__tada')
            assignColors();
        }, 600);
    } else {
        gameStatus.textContent = 'Wrong! Start a new game';
        gameStatus.classList.add('animate__headShake', 'text-red-600');
        setTimeout(() => {
            gameStatus.classList.remove('animate__headShake');
        }, 500);
    }
    // gameStatus.classList.add('animate__headShake');

}

// event listener for the color options
colorOptions.forEach(colorOption => {
    colorOption.addEventListener('click', () => {

        if (failedGame) {
            handleStatus('wrong');
            return;
        }

        // check if the clicked color is the correct color
        if (colorOption.dataset.color === correctColor) {
            score++;
            scoreDisplay.textContent = score;
            handleStatus('correct');

        } else {
            handleStatus('wrong');


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
    gameStatus.classList.remove('text-green-500', 'text-red-600');
    assignColors();
}

newGameButton.addEventListener('click', () => {
    startGame();
});

window.onload = startGame;
