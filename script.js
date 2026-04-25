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
  console.log(board)
  console.log(board[1][2])
}

function Player(
  playerOne = "Player One",
  playerTwo = "Player Two"
){
  const players = [playerOne, playerTwo]
  let activePlayer = players[0]

  function switchTurn(activePlayer){
    activePlayer = activePlayer === player[0]? players[1] : players[0]
  }

  function getActivePlayer(){
    return activePlayer
  }
  console.log(activePlayer)

  return {getActivePlayer}
}


function PlayGame(cell){

}


GameBoard()
const testPlayer = Player("minidu", "who")
console.log(testPlayer.getActivePlayer())