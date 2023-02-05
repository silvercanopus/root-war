const Sidebar = (props) => {
    const { numTurns, numPlacement, numRemoval, newGameFn, sandstormFn, spawnFn, endTurnFn } = props;

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
                <button className="btn btn-light" onClick={() => {endTurnFn()}}>
                    End Turn
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {sandstormFn("N")}}>
                    N Sandstorm
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {sandstormFn("E")}}>
                    E Sandstorm
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {sandstormFn("S")}}>
                    S Sandstorm
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {sandstormFn("W")}}>
                    W Sandstorm
                </button>
            </div>
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {spawnFn()}}>
                    Spawn Random Trees
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