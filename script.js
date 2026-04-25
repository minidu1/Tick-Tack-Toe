function GameBoard(){
  const board =[]
  const row = 3
  const column = 3

  // use for loop and put array into places i want instead of puahing
  for (let i=0; i<row; i++){
    board[i] = []
    for (let j=0; j<column; j++){
      board[i][j]= null
    }
  }

  function getBoard(){
    return board
  }

  // console.log(board)
  // console.log(board[1][2])
  return {board, getBoard}
}

function Player(
  playerOne = "Player One",
  playerTwo = "Player Two"
){
  const players = [playerOne, playerTwo]
  let activePlayer = players[0]

  function switchTurn(){
    activePlayer = activePlayer === players[0]? players[1] : players[0]
  }

  function getActivePlayer(){
    return activePlayer
  }

  return {getActivePlayer,switchTurn}
}


function GameController(clickedCell){

  // make objects
  const board = GameBoard()
  console.log(board.getBoard())

  // test functions
  const testPlayer = Player()
  console.log(`${testPlayer.getActivePlayer()}'s turn`)
  let testClick = board.board[0][0]
  // console.log(testClick)

  function checkAvailableCells(){
    if (testClick == null){
      console.log("empty")
    }
  }

  //test functions
  checkAvailableCells()
}

GameController()