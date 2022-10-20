const tiles = document.querySelectorAll('.tile');
const playerTurn = document.querySelector('.player-turn');
const restartBtn = document.querySelector('.restart-btn');
const test = document.getElementById('test');

// Creating confetti
const confettiElement = document.getElementById('my-canvas');
const confettiSettings = { target: confettiElement };
const confetti = new ConfettiGenerator(confettiSettings);

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let currentPlayer = 1;
let numberOfClick = 0;
let gameTrack = [];

tiles.forEach((tile, idx) => {
  tile.addEventListener('click', e => handleTileClick(e, idx));
});

restartBtn.addEventListener('click', handleRestartBtn);

function handleTileClick(e, idx) {
  // const player = currentPlayer === 1 ? 1 : 2;
  playerTurn.textContent =
    currentPlayer === 1 ? "Player 1's Turn" : "Player 2's Turn";
  const symbol = currentPlayer === 1 ? 'x.svg' : 'o.svg';
  e.target.setAttribute(
    'style',
    `background-image: url(../img/${symbol}); background-repeat:no-repeat; background-size: 10rem;`
  );
  e.target.disabled = true;
  gameTrack[idx] = currentPlayer;
  numberOfClick++;

  if (checkWinner(gameTrack, currentPlayer)) {
    const colorOfWinner = currentPlayer === 1 ? '#ff0000' : '#2a9df4';
    playerTurn.innerHTML = `Player <span style='color: ${colorOfWinner}'>${currentPlayer}</span> Win!`;
    tiles.forEach(tile => (tile.disabled = true));

    confettiElement.style.display = 'block';
    confetti.render();

    setTimeout(() => {
      confettiElement.style.display = 'none';
      restartBtn.style.visibility = 'visible';
      confetti.clear();
    }, 2000);
  } else if (numberOfClick >= tiles.length) {
    playerTurn.textContent = 'Tie Game!';
    restartBtn.style.visibility = 'visible';
    return;
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    playerTurn.textContent = `Player ${currentPlayer}'s Turn`;
  }
}

function checkWinner() {
  return WIN_CONDITIONS.some(condition => {
    return condition.every(position => gameTrack[position] === currentPlayer);
  });
}

function handleRestartBtn() {
  numberOfClick = 0;
  currentPlayer = 1;
  tiles.forEach(tile => {
    tile.disabled = false;
    tile.style.backgroundImage = 'none';
  });
  playerTurn.textContent = "Player 1's Turn";
  gameTrack = [];
  restartBtn.style.visibility = 'hidden';
}
