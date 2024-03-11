import "./styles.css";
import { useEffect, useState } from "react";

//create a board, 3x3, and identify where on this board a user has clicked, then handle
//placing a token (X or O) (switch between each for every go, can't overwrite other token),
// and handle game over.

// board array layout:
// 0,1,2
// 3,4,5
// 6,7,8

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="btn">
      {value}
    </button>
  );
}

export default function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setstatus] = useState("");

  function getWinner(squares) {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [2, 5, 8],
      [1, 4, 7],
      [0, 3, 6]
    ];
    for (let i = 0; i < winningPatterns.length; i++) {
      const [a, b, c] = winningPatterns[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleClick(getCurrentSquare) {
    let cpySquares = [...squares];
    if (getWinner(cpySquares) || cpySquares[getCurrentSquare]) return;
    // ^^^ checks for a winner  ^^^ prevents overwriting a token
    cpySquares[getCurrentSquare] = isXTurn ? "X" : "O";
    //handle switching between tokens, turn about.
    setIsXTurn(!isXTurn);
    setSquares(cpySquares);
  }

  function handleRestart() {
    setIsXTurn(true);
    setSquares(Array(9).fill(""));
  }

  useEffect(() => {
    if (!getWinner(squares) && squares.every((item) => item !== "")) {
      setstatus(`This is a draw, click to play again.`);
    } else if (getWinner(squares)) {
      setstatus(`Winner is ${getWinner(squares)}`);
    } else {
      setstatus(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [squares, isXTurn]);

  console.log(squares);

  return (
    <div className="main">
      <h1>TicTacToe</h1>
      <div className="board">
        <div className="row">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="row">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="row">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <h3>{status}</h3>
      <button onClick={handleRestart} className="restart">
        Restart game
      </button>
    </div>
  );
}
