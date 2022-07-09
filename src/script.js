const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const body = document.querySelector("body");
const restartButton = document.getElementById("restartButton");
const winnigMessageElement = document.getElementById("winningMessage");
const winnigMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

startGame();

restartButton.addEventListener('click',startGame)

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click',handleClick)
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHover();
  winnigMessageElement.classList.remove('show')
  board.classList.remove('show')
  body.classList.remove('show')
}

function handleClick(e) {
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  const cell = e.target;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHover();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || 
    cell.classList.contains(CIRCLE_CLASS)
    })
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function endGame(draw) {
  if (draw) {
    winnigMessageTextElement.innerText = "Draw !";
  } else {
    winnigMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"}WINS!`;
  }
  winnigMessageElement.classList.add("show");
  board.classList.add("show");
  body.classList.add("show");
  
}

function setBoardHover() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
