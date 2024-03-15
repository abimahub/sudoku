import { React, useEffect, useState } from "react";
import "./styles.css";


// board array layout (pipes for visual clarity):
// (NB: I have discalculia, so i have to visualise any manipulation of numbers.)
//
// a0,a1,a2 | b0,b1,b2 | c0,c1,c2      0  1  2  | 3  4  5  | 6  7  8  
// a3,a4,a5 | b3,b4,b5 | c3,c4,c5      9  10 11 | 12 13 14 | 15 16 17    A | B | C
// a6,a7,a8 | b6,b7,b8 | c6,c7,c8      18 19 20 | 21 22 23 | 24 25 26
//
// d0,d1,d2 | e0,e1,e2 | f0,f1,f2      27 28 29 | 30 31 32 | 33 34 35
// d3,d4,d5 | e3,e4,e5 | f3,f4,f5      36 37 38 | 39 40 41 | 42 43 44    D | E | F
// d6,d7,d8 | e6,e7,e8 | f6,f7,f8      45 46 47 | 48 49 50 | 51 52 53
//
// g0,g1,g2 | h0,h1,h2 | i0,i1,i2      54 55 56 | 57 58 59 | 60 61 62
// g3,g4,g5 | h3,h4,h5 | i3,i4,i5      63 64 65 | 66 67 68 | 69 70 71    G | H | I
// g6,g7,g8 | h6,h7,h8 | i6,i7,i8      72 73 74 | 75 76 77 | 78 79 80
//
// this will allow checking of each 3x3 AND each row and column.

//error checking:
// each 3x3, similar to tic tac toe, if [] contains....
// each row:                                                            each 3x3:
// a0,a1,a2,b0,b1,b2,c0,c1,c2          0,1,2,3,4,5,6,7,8                0,1,2,9,10,11,18,19,20
// a3,a4,a5,b3,b4,b5,c3,c4,c5          9,10,11,12,13,14,15,16,17        3,4,5,12,13,14,21,22,23
// a6,a7,a8,b6,b7,b8,c6,c7,c8          18,19,20,21,22,24,25,26          6,7,8,15,16,17,24,25,26
// d0,d1,d2,e0,e1,e2,f0,f1,f2          27,28,29,30,31,32,33,34,35       27,28,29,36,37,38,45,46,47
// d3,d4,d5,e3,e4,e5,f3,f4,f5          36,37,38,39,40,41,42,43,44       30,31,32,39,40,41,48,49,50
// d6,d7,d8,e6,e7,e8,f6,f7,f8          45,46,47,48,49,50,51,52,53       33,34,35,42,43,44,51,52,53
// g0,g1,g2,h0,h1,h2,i0,i1,i2          54,55,56,57,58,59,60,61,62       54,55,56,63,64,65,72,73,74
// g3,g4,g5,h3,h4,h5,i3,i4,i5          63,64,65,66,67,68,69,70,71       57,58,59,66,67,68,75,76,77
// g6,g7,g8,h6,h7,h8,i6,i7,i8          72,73,74,75,76,77,78,79,80       60,61,62,69,70,71,78,79,80
//each column:
//a0,a3,a6,d0,d3,d6,g0,g3,g6           0,9,18,27,36,45,54,63,72
//a1,a4,a7,d1,d4,d7,g1,g4,g7           1,10,19,28,37,46,55,64,73
//a2,a5,a8,d2,d5,d8,g2,g5,g8           2,11,20,29,38,47,56,65,74
//b0,b3,b6,e0,e3,e6,h0,h3,h6           3,12,21,30,39,48,57,66,75
//b1,b4,b7,e1,e4,e7,h1,h4,h7           4,13,22,31,40,49,58,67,76
//b2,b5,b8,e2,e5,e8,h2,h5,h8           5,14,23,32,41,50,59,68,77
//c0,c3,c6,f0,f3,f6,i0,i3,i6           6,15,24,33,42,51,60,69,78
//c1,c4,c7,f1,f4,f7,i1,i4,i7           7,16,25,34,43,52,61,70,79
//c2,c5,c8,f2,f5,f8,i2,i5,i8           8,17,26,35,44,53,62,71,80

function Square({ value, onClick, getOption() }) {
  return (
    <select id="choice" onClick={onClick} className="square">
      {value, getOption()}
      <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
    </select>
  );
}


export default function Sudoku() {
  const [squares, setSquares] = useState(Array(81).fill(""));
  const [error, setError] = useState(null);
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setstatus] = useState("");
  const [showdropdown, setShowDropdown] = useState(false);
  const [userInput, setUserInput] = useState("");
  const choice = [1,2,3,4,5,6,7,8,9]



function getOption() {
  selectElement = 
        document.querySelector('choice');
  output = selectElement.value;
  document.querySelector('.output').textContent = output;
}

  // function getError(squares) {
  //  // refactor for error detection - any two numbers matching in any array
  //   const errorPatterns = [
  //     [0, 1, 2],
  //     [3, 4, 5],
  //     [6, 7, 8],
  //     [0, 4, 8],
  //     [2, 4, 6],
  //     [2, 5, 8],
  //     [1, 4, 7],
  //     [0, 3, 6]
  //   ];
  //   for (let i = 0; i < errorPatterns.length; i++) {
  //     const [a, b, c] = errorPatterns[i];

  //     if (
  //       squares[a] &&
  //       squares[a] === squares[b] &&
  //       squares[a] === squares[c]
  //     ) {
  //       return squares[a];
  //     }
  //   }
  //   return null;
  // }

  // function handleChange(event) {
   

  //   if

  //   setUserInput(chosenInput);
  //     setShowDropdown(true);
  //   } else {
  //     setShowDropdown(false);
  //   }
  // }
  // }

  function handleClick(getCurrentSquare) {
    setShowDropdown(false);
    setUserInput(userInput.target.innerText)
    
    let cpySquares = [...squares];
    // if (getError(cpySquares) || cpySquares[getCurrentSquare]) return;
    // ^^^ checks for duplicate entry  ^^^ prevents overwriting a token
    cpySquares[getCurrentSquare] = isXTurn ? "X" : "O";
    // handle switching between tokens, turn about.
    setIsXTurn(!isXTurn);
    setSquares(cpySquares);
  }
  
  // function handleRestart() {
  //   setIsXTurn(true);
  //   setSquares(Array(81).fill(""));
  // }

  // useEffect(() => {
  //   if (!getError(squares) && squares.every((item) => item !== "")) {
  //     setstatus(`This is a draw, click to play again.`);
  //   } else if (getError(squares)) {
  //     setstatus(`Winner is ${getError(squares)}`);
  //   } else {
  //     setstatus(`Next player is ${isXTurn ? "X" : "O"}`);
  //   }
  // }, [squares, isXTurn]);

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
          <Square value={squares[9]} onClick={() => handleClick(9)} />
          <Square value={squares[10]} onClick={() => handleClick(10)} />
          <Square value={squares[11]} onClick={() => handleClick(11)} />
          
          <Square value={squares[12]} onClick={() => handleClick(12)} />
          <Square value={squares[13]} onClick={() => handleClick(13)} />
          <Square value={squares[14]} onClick={() => handleClick(14)} />
         
          <Square value={squares[15]} onClick={() => handleClick(15)} />
          <Square value={squares[16]} onClick={() => handleClick(16)} />
          <Square value={squares[17]} onClick={() => handleClick(17)} />
          </div>
          <div className="grid-container" id="c">
          <Square value={squares[18]} onClick={() => handleClick(18)} />
          <Square value={squares[19]} onClick={() => handleClick(19)} />
          <Square value={squares[20]} onClick={() => handleClick(20)} />
          
          <Square value={squares[21]} onClick={() => handleClick(21)} />
          <Square value={squares[22]} onClick={() => handleClick(22)} />
          <Square value={squares[23]} onClick={() => handleClick(23)} />
         
          <Square value={squares[24]} onClick={() => handleClick(24)} />
          <Square value={squares[25]} onClick={() => handleClick(25)} />
          <Square value={squares[26]} onClick={() => handleClick(26)} />
          </div>
          </div>
          <div className="row">
          <div className="grid-container" id="d">
          <Square value={squares[27]} onClick={() => handleClick(27)} />
          <Square value={squares[28]} onClick={() => handleClick(28)} />
          <Square value={squares[29]} onClick={() => handleClick(29)} />
          
          <Square value={squares[30]} onClick={() => handleClick(30)} />
          <Square value={squares[31]} onClick={() => handleClick(31)} />
          <Square value={squares[32]} onClick={() => handleClick(32)} />
         
          <Square value={squares[33]} onClick={() => handleClick(33)} />
          <Square value={squares[34]} onClick={() => handleClick(34)} />
          <Square value={squares[35]} onClick={() => handleClick(35)} />
         </div>
         <div className="grid-container" id="e">
          <Square value={squares[36]} onClick={() => handleClick(36)} />
          <Square value={squares[37]} onClick={() => handleClick(37)} />
          <Square value={squares[38]} onClick={() => handleClick(38)} />
          
          <Square value={squares[39]} onClick={() => handleClick(39)} />
          <Square value={squares[40]} onClick={() => handleClick(40)} />
          <Square value={squares[41]} onClick={() => handleClick(41)} />
         
          <Square value={squares[42]} onClick={() => handleClick(42)} />
          <Square value={squares[43]} onClick={() => handleClick(43)} />
          <Square value={squares[44]} onClick={() => handleClick(44)} />
         </div>
         <div className="grid-container" id="f">
          <Square value={squares[45]} onClick={() => handleClick(45)} />
          <Square value={squares[46]} onClick={() => handleClick(46)} />
          <Square value={squares[47]} onClick={() => handleClick(47)} />
          
          <Square value={squares[48]} onClick={() => handleClick(48)} />
          <Square value={squares[49]} onClick={() => handleClick(49)} />
          <Square value={squares[50]} onClick={() => handleClick(50)} />
         
          <Square value={squares[51]} onClick={() => handleClick(51)} />
          <Square value={squares[52]} onClick={() => handleClick(52)} />
          <Square value={squares[53]} onClick={() => handleClick(53)} />
          </div>
          </div>
          <div className="row">
          <div className="grid-container" id="g">
          <Square value={squares[54]} onClick={() => handleClick(54)} />
          <Square value={squares[55]} onClick={() => handleClick(55)} />
          <Square value={squares[56]} onClick={() => handleClick(56)} />
          
          <Square value={squares[57]} onClick={() => handleClick(57)} />
          <Square value={squares[58]} onClick={() => handleClick(58)} />
          <Square value={squares[59]} onClick={() => handleClick(59)} />
         
          <Square value={squares[60]} onClick={() => handleClick(60)} />
          <Square value={squares[61]} onClick={() => handleClick(61)} />
          <Square value={squares[62]} onClick={() => handleClick(62)} />
          </div>
          <div className="grid-container" id="h">
          <Square value={squares[63]} onClick={() => handleClick(63)} />
          <Square value={squares[64]} onClick={() => handleClick(64)} />
          <Square value={squares[65]} onClick={() => handleClick(65)} />
          
          <Square value={squares[66]} onClick={() => handleClick(66)} />
          <Square value={squares[67]} onClick={() => handleClick(67)} />
          <Square value={squares[68]} onClick={() => handleClick(68)} />
         
          <Square value={squares[69]} onClick={() => handleClick(69)} />
          <Square value={squares[70]} onClick={() => handleClick(70)} />
          <Square value={squares[71]} onClick={() => handleClick(71)} />
          </div>
          <div className="grid-container" id="i">
          <Square value={squares[72]} onClick={() => handleClick(72)} />
          <Square value={squares[73]} onClick={() => handleClick(73)} />
          <Square value={squares[74]} onClick={() => handleClick(74)} />
          
          <Square value={squares[75]} onClick={() => handleClick(75)} />
          <Square value={squares[76]} onClick={() => handleClick(76)} />
          <Square value={squares[77]} onClick={() => handleClick(77)} />
         
          <Square value={squares[78]} onClick={() => handleClick(78)} />
          <Square value={squares[79]} onClick={() => handleClick(79)} />
          <Square value={squares[80]} onClick={() => handleClick(80)} />
          </div>
          </div>
          </div>
      
      <h3>
        {status}
      </h3>
      {/* <button onClick={handleRestart} className="s-restart">
            Restart game
          </button> */}
    </div>
    </>
  );
}
