let currentPlayer = 'X';
let moveCount = 0;
let board;
const cells = document.querySelectorAll('.cell');
const turnMessage = document.getElementById('turn-message');
const moveCountElement = document.getElementById('move-count');
const winMessage = document.getElementById('win-message');
const restartButton = document.getElementById('restart-btn');

function startGame() {
    board = Array.from(Array(3), () => Array(3).fill(''));
    cells.forEach(cell => {
        cell.innerText = '';
        cell.addEventListener('click', handleClick);
    });
    turnMessage.innerText = "Player X's turn";
    moveCount = 0;
    updateMoveCount();
    winMessage.classList.add('hidden');
}

function handleClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        event.target.innerText = currentPlayer;
        moveCount++;
        updateMoveCount();

        if (checkWin()) {
            winMessage.innerText = `${currentPlayer} wins!`;
            winMessage.classList.remove('hidden');
            disableCells();
        } else if (checkDraw()) {
            winMessage.innerText = 'It\'s a draw!';
            winMessage.classList.remove('hidden');
            disableCells();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnMessage.innerText = `Player ${currentPlayer}'s turn`;
        }
    }
}

function updateMoveCount() {
    moveCountElement.innerText = `Moves: ${moveCount}`;
}

function checkWin() {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] !== '' && board[i][0] === board[i][1] && board[i][0] === board[i][2]) return true;
        if (board[0][i] !== '' && board[0][i] === board[1][i] && board[0][i] === board[2][i]) return true;
    }
    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[0][0] === board[2][2]) return true;
    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[0][2] === board[2][0]) return true;
    return false;
}

function checkDraw() {
    // Check if the board is full
    return moveCount === 9;
}

function disableCells() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', startGame);

startGame(); // Start the game when the page loads
