const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('game-status');
const playerScoreEl = document.getElementById('player-score');
const iaScoreEl = document.getElementById('ia-score');

let playerScore = 0;
let iaScore = 0;
let currentPlayer = 'player';  
let board = Array(9).fill(null); 
let gameActive = true;  

function iaPlay() {
  if (!gameActive) return;  

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
      gameActive = false;  
      highlightWinningCombination(combination); 
      updateScore(board[a]);
      return;
    }
  }

  if (board.every(cell => cell !== null)) {
    statusText!.textContent = 'Empate!';
    gameActive = false; 
  }
}

function updateScore(winner: string) {
  if (winner === 'X') {
    playerScore++;
    playerScoreEl!.textContent = playerScore.toString();
  } else {
    iaScore++;
    iaScoreEl!.textContent = iaScore.toString();
  }

  setTimeout(resetBoard, 2000);  
}

function highlightWinningCombination(combination: number[]) {
  combination.forEach(index => {
    cells[index].classList.add('winner');
  });
}

function resetBoard() {
  board = Array(9).fill(null);
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('winner'); 
  });
  statusText!.textContent = '';
  currentPlayer = 'player';
  gameActive = true;  
}

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const cellIndex = parseInt(cell.id.split('-')[1]);

    if (board[cellIndex] === null && currentPlayer === 'player' && gameActive) {
      board[cellIndex] = 'X';
      cell.textContent = 'X';
      currentPlayer = 'ia';
      checkWin();
      if (gameActive && currentPlayer === 'ia') {
        setTimeout(iaPlay, 1000);  
      }
    }
  });
});
