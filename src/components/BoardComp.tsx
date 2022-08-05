import React, {FC, useEffect, useState} from 'react';
import {Board} from "../models/Board";
import CellComp from "./CellComp";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    swap: () => void;
    currentPlayer: Player | null;
}

const BoardComp: FC<BoardProps> = ({board, setBoard, swap, currentPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlight();
    }, [selectedCell]);

    function clickCell(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            swap();
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlight() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h1>
                Player: {currentPlayer?.color }
            </h1>
            <div
                className="board"
            >
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {

                            row.map(cell =>
                                <CellComp
                                    click={clickCell}
                                    cell={cell}
                                    key={cell.id}
                                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                />
                            )
                        }
                    </React.Fragment>
                )}
            </div>
        </div>
    );


};

export default BoardComp;
