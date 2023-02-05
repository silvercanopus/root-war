const Sidebar = (props) => {
    const { newGameFn, sandstormFn, spawnFn } = props;

    return (
        <div className="Sidebar">
            write instruction here maybe
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