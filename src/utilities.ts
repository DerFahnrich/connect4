import { IMove } from "./interfaces";
import { TCellValue } from "./types";

export function create2DArray(width = 7, height = 6, value: TCellValue = null): TCellValue[][] {
  const outerArray = new Array<TCellValue[]>(height);

  for (let i = 0; i < outerArray.length; i++) {
    outerArray[i] = new Array(width).fill(value);
  }

  return outerArray;
}

export function checkFor4InARow(board: TCellValue[][], lastMove: IMove): boolean {
  // Check horizontally
  if (checkWinInDirection(board, lastMove, 0, 1)) return true;

  // Check vertically
  if (checkWinInDirection(board, lastMove, 1, 0)) return true;

  // Check diagonally (bottom-left to top-right)
  if (checkWinInDirection(board, lastMove, -1, 1)) return true;

  // Check diagonally (top-left to bottom-right)
  if (checkWinInDirection(board, lastMove, 1, 1)) return true;

  return false;
}

function checkWinInDirection(
  board: TCellValue[][],
  lastMove: IMove,
  rowIncrement: number,
  colIncrement: number
): boolean {
  const playerToken = board[lastMove.rowIndex][lastMove.columnIndex];
  const boardRows = board.length;
  const boardColumns = board[0].length;

  // Variable to keep track of tokens in a row. We want to hit four tokens in a row.
  let count = 0;

  // We start by checking from three steps before the last move in the given direction and we end on three steps after the last move in the given direction. If we find four in a row along the way we return true and thereby breaking the loop.
  for (let i = -3; i <= 3; i++) {
    const newRow = lastMove.rowIndex + i * rowIncrement;
    const newCol = lastMove.columnIndex + i * colIncrement;

    if (
      newRow >= 0 &&
      newRow < boardRows &&
      newCol >= 0 &&
      newCol < boardColumns &&
      board[newRow][newCol] === playerToken
    ) {
      count++;
      if (count === 4) {
        return true;
      }
    } else {
      count = 0;
    }
  }

  return false;
}

export function deepCopy2DArray<T>(arrayIn2DToCopy: T[][]): T[][] {
  return arrayIn2DToCopy.map((innerArray) => [...innerArray]);
}
