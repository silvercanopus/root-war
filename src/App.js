import { useEffect, useState } from "react";
import './App.css';
import startLayout from './starting-layout'
import Board from './Board'
import Sidebar from './Sidebar'

function App() {
  const [tiles, setTiles] = useState(startLayout);

  const newGame = () => {
    setTiles(startLayout);
  }

  const changeTile = (row, col, newValue) => {
    // Function to handle tile change
    let newTiles = tiles.map((row) => (row.slice()));
    if (newTiles[row][col] == '1') {
      newTiles[row][col] = '2';
    } 
    else if (newTiles[row][col] == '2') {
      newTiles[row][col] = '1';
    }
    setTiles(newTiles);
  }

  const sandstorm = () => {
    let newTiles = tiles.map((row) => (row.slice()));
    for (let i = 0; i < tiles.length; i++) {
      for (let j = 0; j < tiles[i].length; j++) {
        if (tiles[i][j] === '1') {
          if (newTiles[Math.max(0, i-1)][j] !== '0') newTiles[Math.max(0, i-1)][j] = '1';
          if (newTiles[Math.min(tiles.length-1, i+1)][j] !== '0') newTiles[Math.min(tiles.length-1, i+1)][j] = '1';
          if (newTiles[i][Math.max(0, j-1)] !== '0') newTiles[i][Math.max(0, j-1)] = '1';
          if (newTiles[i][Math.min(tiles[i].length-1, j+1)] !== '0') newTiles[i][Math.min(tiles[i].length-1, j+1)] = '1';
        }
      }
    }
    setTiles(newTiles);
  }

  return (
    <div className="App">
      <h1>Root War</h1>
      <div className="row">
        <div className="col-xl-1"></div>
        <div className="col-xl-6 col-md-8">
          <Board layout={tiles} changeTile={changeTile}/>
        </div>
        <div className="col-xl-4 col-md-4">
          <Sidebar newGameFn={newGame} sandstormFn={sandstorm} />
        </div>
        <div className="col-xl-1"></div>
      </div>
    </div>
  );
}

export default App;
