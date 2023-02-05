const Sidebar = (props) => {
    const { newGameFn, sandstormFn } = props;

    return (
        <div className="Sidebar">
            write instruction here maybe
            <div className="mt-2">
                <button className="btn btn-light" onClick={() => {sandstormFn()}}>
                    Sandstorm
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