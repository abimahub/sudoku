
import './App.css';
import Sudoku from './components/soduku';
import TicTacToe from './components/tictactoe';
import logo from './logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>
      <img className='App-logo' src={logo} alt=''/>
         An adventure into trying to create a sudoku game, based on the mechanics of freecodecamp's Tic Tac Toe tutorial.
        </p>
         <div>
          {/* <div><TicTacToe /></div> */}
          {/* <div><Sudoku /></div> */}
          <a href='scratchpad.html'>scratchpad</a>
         </div>         
      </header>
    </div>
  );
}

export default App;
