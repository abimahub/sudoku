import { React, useEffect, useState } from "react";
import "./styles.css";


// board array layout (pipes for visual clarity):
// a0,a1,a2 | b0,b1,b2 | c0,c1,c2
// a3,a4,a5 | b3,b4,b5 | c3,c4,c5
// a6,a7,a8 | b6,b7,b8 | c6,c7,c8
//
// d0,d1,d2 | e0,e1,e2 | f0,f1,f2
// d3,d4,d5 | e3,e4,e5 | f3,f4,f5
// d6,d7,d8 | e6,e7,e8 | f6,f7,f8
//
// g0,g1,g2 | h0,h1,h2 | i0,i1,i2
// g3,g4,g5 | h3,h4,h5 | i3,i4,i5
// g6,g7,g8 | h6,h7,h8 | i6,i7,i8
//
// this will allow checking of each 3x3 AND each row and column.

//error checking:
// each 3x3, similar to tic tac toe, if [] contains....
// each row:
// a0,a1,a2,b0,b1,b2,c0,c1,c2
// a3,a4,a5,b3,b4,b5,c3,c4,c5
// a6,a7,a8,b6,b7,b8,c6,c7,c8
// d0,d1,d2,e0,e1,e2,f0,f1,f2
// d3,d4,d5,e3,e4,e5,f3,f4,f5
// d6,d7,d8,e6,e7,e8,f6,f7,f8
// g0,g1,g2,h0,h1,h2,i0,i1,i2
// g3,g4,g5,h3,h4,h5,i3,i4,i5
// g6,g7,g8,h6,h7,h8,i6,i7,i8
//each column:
//a0,a3,a6,d0,d3,d6,g0,g3,g6
//a1,a4,a7,d1,d4,d7,g1,g4,g7
//a2,a5,a8,d2,d5,d8,g2,g5,g8
//b0,b3,b6,e0,e3,e6,h0,h3,h6
//b1,b4,b7,e1,e4,e7,h1,h4,h7
//b2,b5,b8,e2,e5,e8,h2,h5,h8
//c0,c3,c6,f0,f3,f6,i0,i3,i6
//c1,c4,c7,f1,f4,f7,i1,i4,i7
//c2,c5,c8,f2,f5,f8,i2,i5,i8

function Square({ value, onClick }) {
  return (
    <button onClick={onClick} className="square">
      {value}
    </button>
  );
}

export default function Sudoku() {
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
    // handle switching between tokens, turn about.
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
    <>
    <h1>Sudoku</h1>
    <div className="sudoku-main">
      
      <div className="sudoku-board">
      <div className="row">
        <div className="grid-container" id="a">
        
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          <div className="grid-container" id="b">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          <div className="grid-container" id="c">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          </div>
          <div className="row">
          <div className="grid-container" id="d">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
         </div>
         <div className="grid-container" id="e">
         <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
         </div>
         <div className="grid-container" id="f">
         <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          </div>
          <div className="row">
          <div className="grid-container" id="g">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          <div className="grid-container" id="h">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          <div className="grid-container" id="i">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
          
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
         
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
          </div>
          </div>
          </div>
      
      <h3>
        {status}
      </h3>
      <button onClick={handleRestart} className="s-restart">
            Restart game
          </button>
    </div>
    </>
  );
}
