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