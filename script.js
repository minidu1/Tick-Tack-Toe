function GameBoard(){
  const board =[]
  const row = 3
  const column = 3

  // use for loop and put array into places i want instead of pushing
  for (let i=0; i<row; i++){
    board[i] = []
    for (let j=0; j<column; j++){
      board[i][j]= Cell().makeNewCell()
    }
  }

  function getBoard(){
    return board
  }

  return {board, getBoard}
}

function Cell(){

  function makeNewCell(){
    const cell = null
    return cell
  }
  return { makeNewCell }
}

function Player(
  playerOne = "Player One",
  playerTwo = "Player Two"
){
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

  function switchTurn(){
    activePlayer = activePlayer === players[0]? players[1] : players[0]
  }

  function getActivePlayer(){
    return activePlayer
  }

  return {getActivePlayer,switchTurn}
}


function GameController(){

  // make objects
  const board = GameBoard()
  console.log(board.getBoard())

  // test functions
  const newPlayers = Player("min", "man")

  console.log(`${newPlayers.getActivePlayer().name}'s turn`)

  function placeToken(row = 0, column = 0){

    const clickedCell = board.getBoard()[row][column]

    if (clickedCell !== null){
      console.log("Cell is already used")
      console.log(board.getBoard())
    }
    else{
      console.log("Cell is empty")
      board.getBoard()[row][column] = newPlayers.getActivePlayer().token
      console.log(`Cell is now belongs to ${newPlayers.getActivePlayer().token}`)
      console.log(board.getBoard())

      newPlayers.switchTurn()   
      console.log(`${newPlayers.getActivePlayer().name}'s turn`)
    }
  }

  return {placeToken}
}

const newGame = GameController()
newGame.placeToken()
