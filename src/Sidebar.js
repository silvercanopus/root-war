const Sidebar = (props) => {
    const { numTurns, numPlacement, numRemoval, newGameFn, sandstormCountdown, sandstormDirection, endTurnFn } = props;

    const directionName = {'N': 'north', 'E': 'east', 'S': 'south', 'W': 'west'};

    return (
        <div className="Sidebar">
            <div>
                How to play the game: <br />
                Click on a sand tile to plant a tree. <br />
                Click on a tree tile to remove the tree. <br />
                There are limits to the number of trees you can plant and remove every turn. <br />
                Adjacent trees have a chance of creating a new tree. <br />
                Sandstorms will wipe out your trees. A row of 3 or more trees will partially block the sandstorm. <br />
                Rocky tiles will protect the tree immediately behind it. <br />
                Occasionally, some of your trees will catch fire. Fire has a random chance of spreading to neighboring trees. <br />
                Your goal is to cover all of the sand tiles with trees.
            </div>
            <div className="mt-2">
                Turn: {numTurns}
            </div>
            <div className="mt-2">
                Number of trees that can be placed: {numPlacement}
            </div>
            <div className="mt-2">
                Number of removal remaining: {numRemoval}
            </div>
            <div className="mt-2">
                Incoming sandstorm from {directionName[sandstormDirection]} in {sandstormCountdown} turns!
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {endTurnFn()}}>
                    End Turn (E)
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {newGameFn()}}>
                    New Game
                </button>
            </div>
        </div>
    )
}

export default Sidebar;