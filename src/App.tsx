import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComp from "./components/BoardComp";
import {Board} from "./models/Board";
import {Colors} from "./models/Colors";
import {Player} from "./models/Player";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [white, setWhite] = useState(new Player(Colors.WHITE));
    const [black, setBlack] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    useEffect(() => {
        restart();
        setCurrentPlayer(white)
    }, [])

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
    }

    function swapPlayer() {
        if (currentPlayer?.color === Colors.WHITE) {
            setCurrentPlayer(black);
        } else {
            setCurrentPlayer(white);
        }
    }

    return (
        <div className="app">
            <Timer
                restart={restart}
                currentPlayer={currentPlayer}
            />

            <BoardComp
                board={board}
                setBoard={setBoard}
                currentPlayer={currentPlayer}
                swap={swapPlayer}
            />
            <div>
                <LostFigures
                    title={"Black"}
                    figures={board.lostBlack}
                />
                <LostFigures
                    title={"White"}
                    figures={board.lostWhite}
                />
            </div>
        </div>
    );
};

export default App;
