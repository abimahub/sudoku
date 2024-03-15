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

## Method I
//Long way first - create blank board, <s>create 9 arrays, one for each 3x3 square.</s> create one array, as simpler 
//to look for error patterns.
// To begin with, generate numbers by user input.
//Then figure out error-checking.
//Then try to add randomising into each array generation, then error-check results to be left with a 
//solvable puzzle.
//Then work out removal of numbers. 

