import { useEffect, useState } from "react";
import './App.css';
import startLayout from './starting-layout'
import Board from './Board'
import Sidebar from './Sidebar'

function App() {
  let [tiles, setTiles] = useState(startLayout);

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

  const rotateTilesClockwise = (tiles) => {
    console.log(tiles);
    let newTiles = [];
    for (let c = 0; c < tiles[0].length; c++) {
      let newRow = [];
      for (let r = tiles.length-1; r >= 0; r--) {
        newRow.push(tiles[r][c]);
      }
      newTiles.push(newRow);
    }
    console.log(newTiles);
    return newTiles;
  }

  const isOutOfBound = (r, c) => {
    return (r < 0) || (r >= tiles.length) || (c < 0) || (c >= tiles[0].length);
  }

  const isRock = (r, c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === '0';
  }

  const isSand = (r, c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === '1';
  }

  const isTree = (r, c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === '2';
  }

  const hasTreeNorth = (r, c) => {
    return isTree(r - 1, c);
  }

  const hasTreeSouth = (r, c) => {
    return isTree(r + 1, c);
  }

  const hasTreeWest = (r, c) => {
    return isTree(r, c - 1);
  }

  const hasTreeEast = (r, c) => {
    return isTree(r, c + 1);
  }

  const isStableVertically = (r, c) => {
    return isTree(r, c) && hasTreeNorth(r, c) && hasTreeSouth(r, c);
  }

  const isStableHorizontally = (r, c) => {
    return isTree(r, c) && hasTreeWest(r, c) && hasTreeEast(r, c);
  }

  const sandstorm = (direction) => {  
    let numRotation = 0;
    if (direction === "W") {
      numRotation = 1;
    }
    else if (direction === "S") {
      numRotation = 2;
    }
    else if (direction === "E") {
      numRotation = 3;
    }

    for (let i = 0; i < numRotation; i++) {
      tiles = rotateTilesClockwise(tiles);
    }

    let newTiles = tiles.map((row) => (row.slice()));
    const lastRow = tiles.length - 1;
    const lastCol = tiles[0].length - 1;

    // Assume sandstorm is coming from the north
    for (let c = 0; c <= lastCol; c++) {
      for (let r = 0; r <= lastRow; r++) {
        if (isTree(r, c)) {
          if (isStableHorizontally(r, c)) {
            break;
          }

          if (!isRock(r - 1, c)) {
            newTiles[r][c] = '1';
          }
          
          if (hasTreeWest(r, c) && isStableHorizontally(r - 1, c)) {
            break;
          }
          else if (hasTreeEast(r, c) && isStableHorizontally(r + 1, c)) {
            break;
          }
        }
      }
    }

    if (numRotation > 0) {
      for (let i = numRotation; i < 4; i++) {
        tiles = rotateTilesClockwise(tiles);
        newTiles = rotateTilesClockwise(newTiles);
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
