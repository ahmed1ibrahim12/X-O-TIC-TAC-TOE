const boxes = document.querySelectorAll('.box');
const resetButton = document.querySelector('.resetbutton');
const playerText = document.querySelector('.playertext');
const xScoreElement = document.getElementById('xScore');
const oScoreElement = document.getElementById('oScore');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameOver = false;
let xScore = 0;
let oScore = 0;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleBoxClick(e) {
    const index = e.target.id - 1;

    if (board[index] === '' && !isGameOver) {
        board[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        e.target.style.pointerEvents = 'none'; // Disable further clicks on this box

        if (checkWin()) {
            playerText.textContent = `${currentPlayer} Wins!`;
            isGameOver = true;
            updateScore();
        } else if (board.includes('')) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerText.textContent = `Player ${currentPlayer}'s Turn`;
            updateBackgroundColor();
        } else {
            playerText.textContent = 'Draw!';
            isGameOver = true;
        }
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameOver = false;
    currentPlayer = 'X';
    playerText.textContent = `Player ${currentPlayer}'s Turn`;
    updateBackgroundColor();
    boxes.forEach(box => {
        box.textContent = '';
        box.style.pointerEvents = 'auto'; // Enable clicks again
    });
}

function updateBackgroundColor() {
    if (currentPlayer === 'X') {
        document.body.style.backgroundColor = '#FF6347'; // Red
    } else {
        document.body.style.backgroundColor = '#1E90FF'; // Blue
    }
}

function updateScore() {
    if (currentPlayer === 'X') {
        xScore++;
        xScoreElement.textContent = `X: ${xScore}`;
    } else {
        oScore++;
        oScoreElement.textContent = `O: ${oScore}`;
    }
}

boxes.forEach(box => box.addEventListener('click', handleBoxClick));
resetButton.addEventListener('click', resetGame);

playerText.textContent = `Player ${currentPlayer}'s Turn`;
updateBackgroundColor(); // Set initial background color
