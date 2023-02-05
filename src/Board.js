const Board = (props) => {
    const { layout, changeTile } = props;

    return (
        <div className="Board">
            {layout.map((row, i) => (
                <div className="Row" key={`Row-${i}`}>
                    {row.map((value, j) => (
                        <div className="Tile" key={`Tile-${i*row.length+j}`}>
                            <button className={`TileButton Value-${value}`} onClick={() => changeTile(i, j)}>
                                {value}
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Board;