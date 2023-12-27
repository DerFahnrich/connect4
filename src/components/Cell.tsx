import { useEffect, useRef } from "react";

import { TCellValue } from "../types";
import { PLAYER_TOKEN_1, PLAYER_TOKEN_2 } from "../constants";

import "../css/Cell.css";

interface ICellProps {
  columnIndex: number;
  placeToken: (columnIndex: number) => void;
  value: TCellValue;
}

export function Cell({ columnIndex, placeToken, value }: ICellProps): JSX.Element {
  const cell = useRef<HTMLSpanElement>(null);

  const handleOnClick = () => {
    placeToken(columnIndex);
  };

  useEffect(() => {
    switch (value) {
      case PLAYER_TOKEN_1:
        cell.current?.classList.add("red");
        break;
      case PLAYER_TOKEN_2:
        cell.current?.classList.add("yellow");
        break;
      default:
        cell.current?.classList.remove("red");
        cell.current?.classList.remove("yellow");
    }
  }, [value]);

  return <span className="cell" onClick={handleOnClick} ref={cell}></span>;
}
