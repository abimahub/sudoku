# SUDOKU

-Based on a freecodecamp tutorial for making tic tac toe in react.js.
-Built using create-react-app for ease initially.

## Thought Process:

// start by creating a 3x3 board, as with tictactoe, then alter it to make a 9x9 board.
// Meaning, draw the squares, set the squares up with an onClick input detector and 
// error-checking. 
// still run arrays for each 3x3, etc?
//need an algorithm for generating all numbers...

//to generate starter numbers, generate "random" solvable puzzle (all numbers), then remove 
//some numbers to leave a solvable puzzle.
//render this solvable puzzle (not all numbers).
//retain all numbers in arrays, for error-checking? or just simple checking?

//further functionality:
//generate random starter numbers, and determine how many for easy or hard settings.
// minimum starter numbers should be 17 - to ensure only one possible solution.
//handle game over and allow restart.

//User Function:
// each click selecting a square must allow input of only numbers 1-9.
// each 3x3 square must have handling to recognise error when same number entered twice.
// each row and column of 9x9 must have error handling so no number entered twice.

//
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
//
//each column:
// a0,a3,a6,d0,d3,d6,g0,g3,g6
// a1,a4,a7,d1,d4,d7,g1,g4,g7
//a2,a5,a8,d2,d5,d8,g2,g5,g8
//b0,b3,b6,e0,e3,e6,h0,h3,h6
//b1,b4,b7,e1,e4,e7,h1,h4,h7
//b2,b5,b8,e2,e5,e8,h2,h5,h8
//c0,c3,c6,f0,f3,f6,i0,i3,i6
//c1,c4,c7,f1,f4,f7,i1,i4,i7
//c2,c5,c8,f2,f5,f8,i2,i5,i8