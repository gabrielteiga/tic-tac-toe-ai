const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const playerScoreEl = document.getElementById('player-score');
const iaScoreEl = document.getElementById('ia-score');

let playerScore = 0;
let iaScore = 0;
let currentPlayer = 'player';  // Alterna entre 'player' e 'ia'
let board = Array(9).fill(null);  // Representação do tabuleiro

// Simulação da IA (lógica mais simples, deve ser substituída pela lógica real do back-end)
function iaPlay() {
  const emptyCells = board.map((val, index) => (val === null ? index : null)).filter(val => val !== null);
  const iaMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[iaMove] = 'O';
  cells[iaMove].textContent = 'O';
  currentPlayer = 'player';
  checkWin();
}

function checkWin() {
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

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText!.textContent = `${board[a]} venceu!`;
      if (board[a] === 'X') {
        playerScore++;
        playerScoreEl!.textContent = playerScore.toString();
      } else {
        iaScore++;
        iaScoreEl!.textContent = iaScore.toString();
      }
      resetBoard();
      return;
    }
  }

  if (board.every(cell => cell !== null)) {
    statusText!.textContent = 'Empate!';
    resetBoard();
  }
}

function resetBoard() {
  board = Array(9).fill(null);
  cells.forEach(cell => cell.textContent = '');
  currentPlayer = 'player';
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const cellIndex = parseInt(cell.id.split('-')[1]);

    if (board[cellIndex] === null && currentPlayer === 'player') {
      board[cellIndex] = 'X';
      cell.textContent = 'X';
      currentPlayer = 'ia';
      checkWin();
      if (currentPlayer === 'ia') {
        setTimeout(iaPlay, 1000);  // A IA joga após um curto intervalo
      }
    }
  });
});
