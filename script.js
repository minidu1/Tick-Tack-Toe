function GameBoard(){
  const board =[]
  const cell = []
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

GameBoard()