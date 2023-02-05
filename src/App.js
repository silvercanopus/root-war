import { useEffect, useState } from "react";
import './App.css';
import startLayout from './starting-layout'
import Board from './Board'
import Sidebar from './Sidebar'

function App() {
  let [tiles, setTiles] = useState(startLayout);
  let [numTurns, setNumTurns] = useState(1);
  let [numTreesPlaced, setNumTreesPlaced] = useState(0);
  const maxTreesPlacedPerTurn = 1;
  let [numTreesRemoved, setNumTreesRemoved] = useState(0);
  const maxTreesRemovedPerTurn = 1;
  let [numTurnsUntilSandstorm, setNumTurnsUntilSandstorm] = useState(4);
  const minTurnsUntilSandstorm = 3;
  const maxTurnsUntilSandstorm = 5;
  let [nextSandstormDirection, setNextSandstormDirection] = useState('E');
  const spawnChance = 0.1;
  const fireChance = 0.05;

  const newGame = () => {
    setTiles(startLayout);
    setNumTurns(1);
    setNumTreesPlaced(0);
    setNumTreesRemoved(0);
    setNumTurnsUntilSandstorm(4);
    setNextSandstormDirection('E');
  }

  const changeTile = (r, c) => {
    // Function to handle tile change
    let newTiles = tiles.map((row) => (row.slice()));
    if (newTiles[r][c] === 'S' && numTreesPlaced < maxTreesPlacedPerTurn) {
      newTiles[r][c] = 'T';
      setNumTreesPlaced(numTreesPlaced + 1);
    }
    else if (newTiles[r][c] === 'T' && numTreesRemoved < maxTreesRemovedPerTurn) {
      newTiles[r][c] = 'S';
      setNumTreesRemoved(numTreesRemoved + 1);
    }
    setTiles(newTiles);
  }

  const rotateTilesClockwise = (tiles) => {
    let newTiles = [];
    for (let c = 0; c < tiles[0].length; c++) {
      let newRow = [];
      for (let r = tiles.length-1; r >= 0; r--) {
        newRow.push(tiles[r][c]);
      }
      newTiles.push(newRow);
    }
    return newTiles;
  }

  const randomInt = (lo, hi) => {
    return lo + Math.floor(Math.random() * (hi - lo + 1));
  }

  const isOutOfBound = (r, c) => {
    return (r < 0) || (r >= tiles.length) || (c < 0) || (c >= tiles[0].length);
  }

  const isRock = (r, c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === 'R';
  }

  const isSand = (r, c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === 'S';
  }

  const isTree = (r, c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === 'T';
  }

  const isFire = (r,c) => {
    return !isOutOfBound(r, c) && tiles[r][c] === 'F';
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

    // Assume sandstorm is coming from the north
    for (let c = 0; c < tiles[0].length; c++) {
      for (let r = 0; r < tiles.length; r++) {
        if (isTree(r, c)) {
          if (isStableHorizontally(r, c)) {
            break;
          }

          if (!isRock(r - 1, c)) {
            newTiles[r][c] = 'S';
          }
          
          if (hasTreeWest(r, c) && isStableHorizontally(r, c - 1)) {
            break;
          }
          else if (hasTreeEast(r, c) && isStableHorizontally(r, c + 1)) {
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

    return newTiles;
  }

  const spawnRandomTrees = () => {
    let newTiles = tiles.map((row) => (row.slice()));
    for (let r = 0; r < tiles.length; r++) {
      for (let c = 0; c < tiles[r].length; c++) {
        if (isTree(r, c) && hasTreeEast(r, c)) {
          if (Math.random() < spawnChance) {
            // try spawning a tree on an adjacent tile
            const options = [];
            if (isSand(r - 1, c)) options.push('a');
            if (isSand(r - 1, c + 1)) options.push('b');
            if (isSand(r + 1, c)) options.push('c');
            if (isSand(r + 1, c + 1)) options.push('d');
            if (options.length > 0) {
              const randomOption = options[Math.floor(Math.random() * options.length)];
              if (randomOption === 'a') newTiles[r-1][c] = 'T';
              else if (randomOption === 'b') newTiles[r-1][c+1] = 'T';
              else if (randomOption === 'c') newTiles[r+1][c] = 'T';
              else if (randomOption === 'd') newTiles[r+1][c+1] = 'T';
            }
          }
        }
        if (isTree(r, c) && hasTreeSouth(r, c)) {
          if (Math.random() < spawnChance) {
            // try spawning a tree on an adjacent tile
            const options = [];
            if (isSand(r, c - 1)) options.push('a');
            if (isSand(r + 1, c - 1)) options.push('b');
            if (isSand(r, c + 1)) options.push('c');
            if (isSand(r + 1, c + 1)) options.push('d');
            if (options.length > 0) {
              const randomOption = options[Math.floor(Math.random() * options.length)];
              if (randomOption === 'a') newTiles[r][c-1] = 'T';
              else if (randomOption === 'b') newTiles[r+1][c-1] = 'T';
              else if (randomOption === 'c') newTiles[r][c+1] = 'T';
              else if (randomOption === 'd') newTiles[r+1][c+1] = 'T';
            }
          }
        }
      }
    }
    return newTiles;
  }

  const setFireRandom = () => {
    let newTiles = tiles.map((row) => (row.slice()));
    for (let r = 0; r < newTiles.length; r++) {
      for (let c = 0; c < newTiles[r].length; c++) {
        if (isTree(r, c)) {
          if (Math.random() < fireChance) {
            newTiles[r][c] = 'F';
          }
        }
      }
    }
    return newTiles;
  }

  const spreadFire = () => {
    let newTiles = tiles.map((row) => (row.slice()));
    // Spread fire
    for (let r = 0; r < newTiles.length; r++) {
      for (let c = 0; c < newTiles[r].length; c++) {
        if (isFire(r, c)) {
          if (hasTreeNorth(r, c)) newTiles[r-1][c] = 'F';
          if (hasTreeSouth(r, c)) newTiles[r+1][c] = 'F';
          if (hasTreeWest(r, c)) newTiles[r][c-1] = 'F';
          if (hasTreeEast(r, c)) newTiles[r][c+1] = 'F';
        }
      }
    }
    // Burnt trees become sand again
    for (let r = 0; r < newTiles.length; r++) {
      for (let c = 0; c < newTiles[r].length; c++) {
        if (isFire(r, c)) {
          newTiles[r][c] = 'S';
        }
      }
    }
    return newTiles;
  }

  const endTurn = async () => {
    setNumTurns(numTurns + 1);
    setNumTreesPlaced(0);
    setNumTreesRemoved(0);

    // Update tiles
    const originalTiles = tiles.map((row) => (row.slice()));
    if (numTurnsUntilSandstorm === 1) {
      tiles = sandstorm(nextSandstormDirection);
      const options = ['N', 'E', 'S', 'W'];
      setNextSandstormDirection(options[Math.floor(Math.random() * options.length)]);
      setNumTurnsUntilSandstorm(randomInt(minTurnsUntilSandstorm, maxTurnsUntilSandstorm));
    }
    else {
      setNumTurnsUntilSandstorm(numTurnsUntilSandstorm - 1);
    }
    tiles = spreadFire();
    tiles = spawnRandomTrees();
    const newTiles = tiles;
    tiles = originalTiles;
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
          <Sidebar 
            numTurns={numTurns}
            numPlacement={maxTreesPlacedPerTurn - numTreesPlaced}
            numRemoval={maxTreesRemovedPerTurn - numTreesRemoved}
            newGameFn={newGame} 
            sandstormCountdown={numTurnsUntilSandstorm}
            sandstormDirection={nextSandstormDirection}
            sandstormFn={sandstorm} 
            spawnFn={spawnRandomTrees} 
            setFireFn={setFireRandom}
            endTurnFn={endTurn}/>
        </div>
        <div className="col-xl-1"></div>
      </div>
    </div>
  );
}

export default App;
