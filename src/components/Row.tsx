import { Cell } from ".";
import { TCellValue } from "../types";

import "../css/Row.css";

interface IRowProps {
  placeToken: (columnIndex: number) => void;
  row: TCellValue[];
}

export function Row({ placeToken, row }: IRowProps): JSX.Element {
  return (
    <div className="row">
      {row.map((cell, index) => (
        <Cell columnIndex={index} key={index} placeToken={placeToken} value={cell} />
      ))}
    </div>
  );
}
