import React, { Component } from 'react';
import BoardCell from './components/BoardCell'


class App extends Component {
  constructor(){
    super()
    this.state = {
      board: []
    }
    this.cycleBoard = this.cycleBoard.bind(this)
  }
  componentDidMount(){
    this.generateBoard()
  }
  generateBoard(){
    var initialBoard = [];
    for(var i = 0; i < 50; i++) {
      initialBoard.push([])
      for(var j = 0; j < 50; j++) {
        var randomNumber = Math.round(Math.random())
        initialBoard[i].push(randomNumber);
      }
    }
    this.setState({ board: initialBoard },
      () => setTimeout(this.cycleBoard,0)
    )
  }
  renderBoard() {
    return this.state.board.map((row, i) => (
      <div key={i} style={{display: 'flex', flexDirection: 'row'}}>
        {row.map((cell, i) => (
          <BoardCell key={i} value={cell}/>
        ))}
      </div>
    ))
  }
  generateNeighborObject(i, j, board) {
    // console.log('i',i, 'j', j, board)
    return {
      top: i-1>-1 && board[i-1][j],
      topRight: i-1>-1 && j < 49 && board[i-1][j+1],
      right: j+1<50 && board[i][j+1],
      bottomRight: i+1<49 && j+1<49 && board[i+1][j+1],
      bottom: i+1<49 && board[i+1][j],
      bottomLeft: i+1<4 && j-1>-1 && board[i+1][j-1],
      left: j-1>-1 && board[i][j-1],
      topLeft: i-1>-1 && j-1>-1 && board[i-1][j-1],
    }
  }
  cycleCell(i, j, board) {
    var obj = this.generateNeighborObject(i,j, board)
    var siblings = 0;
    for(var neighbor in obj) {
      if(obj[neighbor] === 1) {
        siblings++;
      }
    }
    if(siblings === 3) {
      board[i][j] = 1;
    } else if(siblings < 2 || siblings > 3) {
        board[i][j] = 0;
    }
    return board
  }
  cycleBoard() {
    var board = this.state.board.slice();
    for(var i = 0; i < 50; i++) {
      for(var j = 0; j < 50; j++) {
        board = this.cycleCell(i,j, board);
      }
    }
    // console.log(board)
    this.setState({ board },
      () => setTimeout(this.cycleBoard, 200)
    );
  }
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', flexDirection: 'column'}}>
        {this.renderBoard()}
      </div>
    );
  }
}

export default App;
