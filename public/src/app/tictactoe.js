import MyStorage from '../MyStorage.js';

class TicTacToeApp extends HTMLElement {
  constructor() {
    super();
    this.style.display = 'none';
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.turn = 'X';
  }

  connectedCallback() {
    this.innerHTML = `
            <div>
            <div id="top-bar" draggable="true">
                <p>Tic Tac Toe</p>
                <button id="close-button">X</button>
            </div>
            <div style="display: flex; justify-content: space-evenly; margin-top: 1rem; color: #6bdb02">
                <p>It's <span id="turn"></span>'s turn</p>
                <p style="margin-left: 1rem">X's point: <span id="x-point"></span></p>
                <p style="margin-left: 1rem">O's point: <span id="o-point"></span></p>
            </div>
            <div id="reset-div" style="display: flex; justify-content: space-evenly">
                <button id="reset-button">Reset</button>
            </div>
            <table id="board">
                <tr>
                <td id="0"></td>
                <td id="1"></td>
                <td id="2"></td>
                </tr>
                <tr>
                <td id="3"></td>
                <td id="4"></td>
                <td id="5"></td>
                </tr>
                <tr>    
                <td id="6"></td>
                <td id="7"></td>
                <td id="8"></td>
                </tr>
            </table>
            </div>
        `;

    this.querySelector('#close-button').addEventListener('click', () => {
      this.style.display = 'none';
    });

    let xPoint = 0;
    let oPoint = 0;

    const xPointSpan = this.querySelector('#x-point');
    xPointSpan.innerHTML = xPoint;
    const oPointSpan = this.querySelector('#o-point');
    oPointSpan.innerHTML = oPoint;

    this.querySelector('#reset-button').addEventListener('click', () => {
      this.reset();
    });

    const turnSpan = this.querySelector('#turn');
    turnSpan.innerHTML = this.turn;

    this.querySelectorAll('td').forEach((td, index) => {
      // if (localStorage.getItem('vibrating') === 'true') {
      if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
        navigator.vibrate(50);
      }
      td.addEventListener('click', () => {
        if (this.board[index] === '') {
          td.innerHTML = this.turn;
          this.board[index] = this.turn;
          turnSpan.innerHTML = this.turn === 'X' ? 'O' : 'X';
          if (this.checkWin(this.turn)) {
            if (this.turn === 'X') {
              xPoint++;
              xPointSpan.innerHTML = xPoint;
            } else {
              oPoint++;
              oPointSpan.innerHTML = oPoint;
            }
            alert(`${this.turn} wins!`);
            // if (localStorage.getItem('vibrating') === 'true') {
            if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
              navigator.vibrate(200);
            }
            this.reset();
          } else if (this.checkDraw()) {
            alert('Draw!');
            // if (localStorage.getItem('vibrating') === 'true') {
            if (MyStorage.getCurrentUserValue('vibrating') === 'true') {
              navigator.vibrate(200);
            }
            this.reset();
          } else {
            this.turn = this.turn === 'X' ? 'O' : 'X';
          }
        }
      });
    });
  }

  checkWin(player) {
    return (
      this.board[0] === player
            && this.board[1] === player
            && this.board[2] === player
    )
            || (this.board[3] === player
            && this.board[4] === player
            && this.board[5] === player)
            || (this.board[6] === player
            && this.board[7] === player
            && this.board[8] === player)
            || (this.board[0] === player
            && this.board[3] === player
            && this.board[6] === player)
            || (this.board[1] === player
            && this.board[4] === player
            && this.board[7] === player)
            || (this.board[2] === player
            && this.board[5] === player
            && this.board[8] === player)
            || (this.board[0] === player
            && this.board[4] === player
            && this.board[8] === player)
            || (this.board[2] === player
            && this.board[4] === player
            && this.board[6] === player);
  }

  checkDraw() {
    return this.board.every((field) => field !== '');
  }

  reset() {
    this.board = ['', '', '', '', '', '', '', '', ''];
    this.turn = 'X';
    this.querySelectorAll('td').forEach((td) => (td.innerHTML = ''));
  }
}

customElements.define('my-tic-tac-toe', TicTacToeApp);
