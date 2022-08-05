import React, {FC} from 'react';
import {Cell} from "../models/Cell";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
}

const CellComp: FC<CellProps> = ({cell, selected, click}) => {
    return (
        <div
            className={[ "cell", selected ? "selected" : '', cell.color].join(" ")}
            onClick={()=> click(cell)}
            style={{background: cell.available && cell.figure ? "green" : ""}}
        >
            {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
            {cell.available && !cell.figure && <div className="available"></div>}
        </div>
    );
};

export default CellComp;
