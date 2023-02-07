const cellDiv = document.querySelectorAll('.cell');
const statusDiv = document.querySelector('#statusText');
const restartBtn = document.querySelector('#restartBtn');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let running = false;

const initializeGame = () => {
  cellDiv.forEach((cell) =>
    cell.addEventListener('click', () => cellClicked(cell))
  );
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
};
const cellClicked = (cell) => {
  const cellIndex = cell.getAttribute('cellIndex');

  if (board[cellIndex] != '' || !running) {
    return;
  }
  updateCell(cell, cellIndex);
  checkWinner();
};
const updateCell = (cell, index) => {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  changePlayer();
};
const changePlayer = () => {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
};

const checkWinner = () => {
  let roundWon = false;

  for (let index in winningConditions) {
    const condition = winningConditions[index];

    const cellA = board[condition[0]];
    const cellB = board[condition[1]];
    const cellC = board[condition[2]];

    if (cellA == '' || cellB == '' || cellC == '') {
      continue;
    }

    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    changePlayer();
    statusText.textContent = `${currentPlayer} wins!`;
    running = false;
  } else if (!board.includes('')) {
    statusText.textContent = 'Draw!';
    running = false;
  }
};

const restartGame = () => {
  cellDiv.forEach((cell) => (cell.textContent = ''));
  running = true;
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `${currentPlayer}'s turn`;
};

window.onload = initializeGame;
