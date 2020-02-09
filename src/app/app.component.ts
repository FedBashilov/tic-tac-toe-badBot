import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';
  public board = null;
  public currentPlayer = 'X';
  public clickable = true;

  constructor(){
  }

  ngOnInit(){
    this.initBoard();
  }

  initBoard(){
    this.currentPlayer = 'X';
    this.clickable = true;
    this.board = [
      ['','',''],
      ['','',''],
      ['','','']
    ];
  }


  humanMove(row, column){
    if(this.clickable == true){
      let winner: string = '';

      this.makeMove(row, column, this.board);
      winner = this.checkWinner(this.board)

      if(winner == ''){             //game continues
        this.currentPlayer = 'O';
        this.clickable = false;

        setTimeout(() => {
          this.botMove();
        }, 500);

      } else {                    //output winner
        this.clickable = false;
        alert(winner);
      }

    }
  }

  botMove(){
    let fakeBoard = [];
    let targetRow = null;
    let targetColumn = null;
    let moveMade = false;

    //copy board
    for (let i = 0; i < this.board.length; i++) {
      fakeBoard[i] = [];
      for (let j = 0; j < this.board[0].length; j++) {
        fakeBoard[i][j] = this.board[i][j];
      }
    }

    //go through all the cells
    breakout:
    for (let i = 0; i <  this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++){
      //check if the bot won
        if( this.makeMove(i, j, fakeBoard) ){
          if( this.checkWinner(fakeBoard) == '' || this.checkWinner(fakeBoard) == 'Tie' ){ //bot not won
            this.makeMove(i, j, this.board);
            moveMade = true;
            break breakout;
          } else {      //bot won
            //copy for old state
            fakeBoard[i][j] = this.board[i][j];
          }
        }
      }
    }

    if(moveMade == false){    //bot won anyway
      alert("Ooops, bot won. You should try to win better");
      this.clickable = false;
    } else {
      this.currentPlayer = 'X';
      this.clickable = true;
    }

  }

  makeMove(row, column, board){
    if(board[row][column] ==''){
      board[row][column] = this.currentPlayer;
      return true;
    } else {
      return false;
    }
  }


  checkWinner(board){
    //horizontal
    for (let i = 0; i < board.length; i++) {
      if(this.equal3(board[i][0], board[i][1], board[i][2])){
        return board[i][0] + " won!";

      }
    }

    //vertical
    for (let i = 0; i < board.length; i++) {
      if(this.equal3(board[0][i], board[1][i], board[2][i])){
        return board[0][i] + " won!";
      }
    }

    //diagonal
    if( this.equal3(board[0][0], board[1][1], board[2][2]) ||
        this.equal3(board[0][2], board[1][1], board[2][0])){
      return board[1][1] + " won!";
    }

    //tie
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if(board[i][j] == ''){
          return '';
        }
      }
    }

    return "Tie";

  }

  equal3(a, b, c){
    if(a == b && b ==c && c==a && a!=''){
      return true;
    } else {
      return false;
    }
  }



}
