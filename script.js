function GameBoard() {
  const board = []
  const row = 3
  const column = 3

  for (let i = 0; i < row; i++) {
    board[i] = []
    for (let j = 0; j < column; j++) {
      board[i][j] = Cell().makeNewCell()
    }
  }

  const getBoard = () => board

  return { getBoard }
}

function Cell() {

  function makeNewCell() {
    const cell = null
    return cell
  }
  return { makeNewCell }
}

function Player(
  playerOne = "Player One",
  playerTwo = "Player Two"
) {
  const players = [
    {
      name: playerOne,
      token: "x",
      wins: 0
    },
    {
      name: playerTwo,
      token: "o",
      wins: 0
    }
  ]
  let activePlayer = players[0]

  function switchTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  function getActivePlayer() {
    return activePlayer
  }

  function resetActivePlayer() {
    activePlayer = players[0]
  }

  function resetWins() {
    players.forEach(player => player.wins = 0)
  }

  function getScore() {
    return players.map(player => player.wins)
  }

  return { getActivePlayer, switchTurn, resetActivePlayer, resetWins, getScore }
}


function GameController(newPlayers, board) {

  // make objects
  // let board = GameBoard()
  console.log(board.getBoard())

  console.log(`${newPlayers.getActivePlayer().name}'s turn`)

  function placeToken(row, column) {

    const clickedCell = board.getBoard()[row][column]

    if (clickedCell !== null) {
      console.log("Cell is already used. Please click empty cell")
      console.log(`${newPlayers.getActivePlayer().name}'s turn`)
      console.log(board.getBoard())
    }
    else {
      board.getBoard()[row][column] = newPlayers.getActivePlayer().token
      console.log(`Placed token ${newPlayers.getActivePlayer().token}`)
      console.log(board.getBoard())

      if (winRoundDetector()) {
        console.log(`win round`)
        addWinToPlayer()
        displayScore()
        resetBoard()
        return "round-win"
      }

      if (checkIsBoardFull()) {
        resetBoard()
        return "board-full"
      }

      newPlayers.switchTurn()
      console.log(`${newPlayers.getActivePlayer().name}'s turn`)
    }
  }

  function winRoundDetector() {

    const currentBoard = board.getBoard()

    //Horizontal win
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i].every((value, index) => value === currentBoard[i][0] && value !== null)) {
        console.log(`${i} Row win`)
        console.log(`${newPlayers.getActivePlayer().name} won the round`)
        return true
      }
    }

    // Vertical win
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[0][i] === currentBoard[1][i] && currentBoard[0][i] === currentBoard[2][i] && currentBoard[0][i] !== null) {
        console.log(`${i} Column win`)
        console.log(`${newPlayers.getActivePlayer().name} won the round`)
        return true
      }
    }

    //Diagonal Win
    if (currentBoard[0][0] === currentBoard[1][1] && currentBoard[0][0] === currentBoard[2][2] && currentBoard[0][0] !== null) {
      console.log(`Diagonal win`)
      console.log(`${newPlayers.getActivePlayer().name} won the round`)
      return true
    }

    if (currentBoard[0][2] === currentBoard[1][1] && currentBoard[0][2] === currentBoard[2][0] && currentBoard[0][2] !== null) {
      console.log(`Diagonal win`)
      console.log(`${newPlayers.getActivePlayer().name} won the round`)
      return true
    }

    return false
  }

  function addWinToPlayer() {
    newPlayers.getActivePlayer().wins++
    console.log(newPlayers.getActivePlayer().wins)
  }
  function resetBoard() {
    board.getBoard().forEach(row => {
      row.forEach((cell, index) => row[index] = null)
    })

    newPlayers.resetActivePlayer()
    console.log(`${newPlayers.getActivePlayer().name}'s turn`)
    console.log(board.getBoard())
  }

  function resetGame() {
    resetBoard()
    newPlayers.resetWins()
    console.log(newPlayers.getActivePlayer().wins)
  }

  function checkIsBoardFull() {
    if (board.getBoard().every(row =>
      row.every(cell => cell !== null))) {
      return true
    }
    else {
      return false
    }
  }

  function displayScore() {
    console.log(`Player 1's score is ${newPlayers.getScore()[0]}`)
    console.log(`Player 2's score is ${newPlayers.getScore()[1]}`)
  }

  return {
    placeToken,
    getBoard: board.getBoard
  }
}

// const newPlayers = Player("Player 1", "player 2")
// const newGame = GameController(newPlayers)
// newGame.placeToken(0, 2)

function ScreenController() {

  const players = Player("Player 1", "player 2")
  const gameBoard = GameBoard()
  const game = GameController(players, gameBoard)
  let board = game.getBoard()
  console.log(board)

  const boardDiv = document.querySelector(".board-section")

  function makeBoard() {
    boardDiv.textContent = ""
    for (let row = 0; row < board.length; row++) {
      for (let column = 0; column < board[row].length; column++) {
        const cell = document.createElement("button")
        cell.classList.add("cell")
        cell.dataset.row = row
        cell.dataset.column = column

        if (board[row][column] !== null) {
          cell.textContent = board[row][column]
        }

        boardDiv.appendChild(cell)
      }
    }

    const cells = document.querySelectorAll(".cell")

    cells.forEach(cell => {
      cell.addEventListener("click", () => {
        console.log("cell clicked")
        const result = game.placeToken(
          parseInt(cell.dataset.row),
          parseInt(cell.dataset.column))

          if (result === "round-win"){
            alert("Win")
          }
          else if (result === "board-full"){
            alert("Draw")
          }
        makeBoard()
      })
    })

  }

  makeBoard()

}

ScreenController()