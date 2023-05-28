let rectangles = document.querySelectorAll(".rectangle");
let message = document.getElementById("message");
let newGameButton = document.getElementById("newgame");
let currentPlayer = "X";
let gameStatus = "";
let moves = 0;
function handleSquareClick(event) {
  let rectangles = event.target;

  if (rectangles.textContent === "" && gameStatus === "") {
    rectangles.classList.add(currentPlayer);
    rectangles.textContent = currentPlayer;
    checkGameStatus();
    togglePlayer();
    if (gameStatus === "" && currentPlayer === "O") {
      setTimeout(function() {
        botMove();
      }, 200);
    }
  }
}

function botMove() {
  let emptySquares = [];
  for (let i = 0; i < rectangles.length; i++) {
    if (rectangles[i].textContent === "") {
      emptySquares.push(rectangles[i]);
    }
  }

  if (emptySquares.length === 0) {
    return;
  }

  let randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
  randomSquare.classList.add(currentPlayer);
  randomSquare.textContent = currentPlayer;
  checkGameStatus();
  togglePlayer();
}

function checkGameStatus() {
  moves++;
  if (checkWin("X")) {
    gameStatus = "X";
  } else if (checkWin("O")) {
    gameStatus = "O";
  } else if (moves === 9) {
    gameStatus = "tie";
  }

  if (gameStatus !== "") {
    if (gameStatus === "tie") {
      message.textContent = "Ничья?!";
    } else {
      message.textContent = `${gameStatus} Победил!`;
    }
  }
}

function checkWin(player) {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  return winConditions.some(function(condition) {
    return condition.every(function(index) {
      return rectangles[index].classList.contains(player);
    });
  });
}

function togglePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
}

function newGame() {
    for (let i = 0; i < rectangles.length; i++) {
      rectangles[i].classList.remove("X", "O");
      rectangles[i].textContent = "";
    }
    gameStatus = "";
    moves = 0;
    message.textContent = "";
    currentPlayer = "X";
  }
  
  for (let i = 0; i < rectangles.length; i++) {
    rectangles[i].addEventListener("click", handleSquareClick);
  }
  
  newGameButton.addEventListener("click", newGame);