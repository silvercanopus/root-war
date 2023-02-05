const Sidebar = (props) => {
    const { numTurns, numPlacement, numRemoval, newGameFn, sandstormCountdown, sandstormDirection, endTurnFn } = props;

    const directionName = {'N': 'north', 'E': 'east', 'S': 'south', 'W': 'west'};

    return (
        <div className="Sidebar">
            <div>
                How to play the game: <br />
                Click on a sand tile to plant a tree. <br />
                Click on a tree tile to remove the tree. <br />
                Rocky tiles are not interactable. <br />
                There are limits to the number of trees you can plant and remove every turn. <br />
                Sandstorms will wipe out your trees. You can minimize the damage by planting trees in a row. <br />
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
                    End Turn
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