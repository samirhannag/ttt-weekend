/*-------------------------------- Constants --------------------------------*/
const audioStart = new Audio('audio/MELODY_2.mp3');
const audioX = new Audio('audio/X.mp3');
const audioO = new Audio('audio/O.mp3');
const audioWin = new Audio('audio/YOU_WIN.mp3');

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner;
let turnCount = 1;
let isWinner = false;

/*------------------------ Cached Element References ------------------------*/
let gameStatus = document.getElementById('message');


/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('section.board').addEventListener('click', onClick);



/*-------------------------------- Functions --------------------------------*/

init();
function setTextColor(picker) {
  document.getElementsByTagName('p')[0].style.color = '#' + picker.toString()
}

function init() {
  board = ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
  setTimeout(function () { audioStart.play(); }, 1000);
  setTimeout(function () { audioStart.play(); }, 3000);
  turn = 1;
  gameStatus.textContent = "Choose a side!";
}
function onClick(evt) {
  let squareIdx = parseInt(evt.target.id.replace('sq', ''));
  if (board[squareIdx] !== 'null') return;
  getWinner();
  render(squareIdx);
}
function getWinner() {
  if (board[0] + board[1] + board[2] === 3 || board[3] + board[4] + board[5] === 3 || board[6] + board[7] + board[8] === 3 ||
    board[0] + board[3] + board[6] === 3 || board[1] + board[4] + board[7] === 3 || board[2] + board[5] + board[8] === 3 ||
    board[0] + board[4] + board[8] === 3 || board[2] + board[4] + board[6] === 3) {
    gameStatus.textContent = "Congrats X wins the game!";
    setTimeout(function () { audioWin.play(); }, 1000);
    document.getElementById("board").className += " hvr-buzz-out";
    confetti.start(1500);
    isWinner = true;
  }
  if (board[0] + board[1] + board[2] === -3 || board[3] + board[4] + board[5] === -3 || board[6] + board[7] + board[8] === -3 ||
    board[0] + board[3] + board[6] === -3 || board[1] + board[4] + board[7] === -3 || board[2] + board[5] + board[8] === -3 ||
    board[0] + board[4] + board[8] === -3 || board[2] + board[4] + board[6] === -3) {
    gameStatus.textContent = "Congrats O wins the game!";
    setTimeout(function () { audioWin.play(); }, 1000);
    document.getElementById("board").className += " hvr-buzz-out";
    confetti.start(1500);
    isWinner = true;
  }
}
function render(squareIdx) {
  if (isWinner === false) {
    setLetter = document.getElementById(`sq${squareIdx}`);
    // document.getElementById(`sq${squareIdx}`).style.backgroundColor = SQUARE_STATE[turn]; // removed to enable the color picker functionality
    board[squareIdx] = turn;
    if (turn === 1) {
      setLetter.textContent = "X";
      audioX.play();
      document.getElementById(`sq${squareIdx}`).style.backgroundColor = document.getElementById("colorA").style.backgroundColor;
      gameStatus.textContent = "Player O's turn"
    } else {
      setLetter.textContent = "O";
      audioO.play();
      document.getElementById(`sq${squareIdx}`).style.backgroundColor = document.getElementById("colorB").style.backgroundColor;
      gameStatus.textContent = "Player X's turn"
    }
  }
  turn *= -1;
  getWinner();
  turnCount++;
  if (turnCount === 10 && isWinner === false) {
    gameStatus.textContent = "Its a Tie";
    document.getElementById("board").className += " hvr-buzz-out";
  }
}