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
      token: "x"
    },
    {
      name: playerTwo,
      token: "o"
    }
  ]
  let activePlayer = players[0]

  function switchTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0]
  }

  function getActivePlayer() {
    return activePlayer
  }

  return { getActivePlayer, switchTurn }
}


function GameController() {

  // make objects
  const board = GameBoard()
  console.log(board.getBoard())

  // test functions
  const newPlayers = Player("Player 1", "player 2")

  console.log(`${newPlayers.getActivePlayer().name}'s turn`)

  function placeToken(row = 0, column = 0) {

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
      
      if (winGame()){
        console.log("Game controller stoped")
        return true
      }

      newPlayers.switchTurn()
      console.log(`${newPlayers.getActivePlayer().name}'s turn`)
    }
  }

  function winGame() {
    console.log("wingame called")
    const currentBoard = board.getBoard()

    for (i = 0; i < currentBoard.length; i++) {

      if (currentBoard[i].every((value, index) => value === currentBoard[i][0] && value !== null)) {
        console.log(`${newPlayers.getActivePlayer().name} is the winner`)
        return true
        // break
      }
      else {
        console.log("not win")
      }
    }

    return false
  }

  return { placeToken }
}

const newGame = GameController()
newGame.placeToken(2, 0)
newGame.placeToken(1, 0)
newGame.placeToken(2, 1)
newGame.placeToken(1, 1)
newGame.placeToken(0, 2)
newGame.placeToken(1, 2)



// board[0][1]
// board[0][2]
// board[0][3]

// board[1][1]
// board[1][2]
// board[1][3]


// board[0][0]
// board[1][0]
// board[2][0]

// board[0][0]
// board[1][1]
// board[2][2]

// board[0][2]
// board[1][1]
// board[2][0]