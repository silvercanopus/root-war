const Sidebar = (props) => {
    const { numTurns, numPlacement, numRemoval, newGameFn, sandstormCountdown, sandstormDirection, endTurnFn } = props;

    const directionName = {'N': 'north', 'E': 'east', 'S': 'south', 'W': 'west'};

    return (
        <div className="Sidebar">
            <p>write instruction here maybe</p>
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