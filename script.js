function GameBoard(){
  const board =[]
  const cell = []
  const row = 3
  const column = 3

  for (let i=0; i<row; i++){
    board[i] = cell
    for (let j=0; j<column; j++){
      cell[j]= null
    }
  }
  console.log(board)
  console.log(board[1][2])
}

GameBoard()