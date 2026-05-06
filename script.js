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

  function resetActivePlayer(){
    activePlayer = players[0]
  }

  function resetWins(){
    players.forEach( player => player.wins = 0)
  }

  function getScore(){
    players.forEach( player => {
      return player.wins
    });
  }

  return { getActivePlayer, switchTurn, resetActivePlayer, resetWins}
}


function GameController(newPlayers) {

  // make objects
  let board = GameBoard()
  console.log(board.getBoard())

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

      if (winRoundDetector() ) {
        addWinToPlayer()
        resetBoard()
        return true
      }

       if (checkIsBoardFull() ) {
        resetBoard()
        return true
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

  function addWinToPlayer(){
    newPlayers.getActivePlayer().wins++
      console.log(newPlayers.getActivePlayer().wins)
  }
  function resetBoard(){
      board = GameBoard()
      newPlayers.resetActivePlayer()
      console.log(`${newPlayers.getActivePlayer().name}'s turn`)
  }
  
  function resetGame(){
    resetBoard()
    newPlayers.resetWins()
    console.log(newPlayers.getActivePlayer().wins)
  }

  function checkIsBoardFull(){
    if(board.getBoard().every(row =>
       row.every(cell => cell !== null))){
      return true
    }
  }
  
  return { placeToken}
}

const newPlayers = Player("Player 1", "player 2")
const newGame = GameController(newPlayers)

newGame.placeToken(0, 2)
newGame.placeToken(0, 1)
newGame.placeToken(1, 1)
newGame.placeToken(1, 2)
newGame.placeToken(2, 0)
