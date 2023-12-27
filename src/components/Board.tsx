import { Dispatch, useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Row } from ".";
import { TCellValue } from "../types";
import { BOARD, PLAYER_TOKEN_1, PLAYER_TOKEN_2 } from "../constants";
import { IMove } from "../interfaces";
import { checkFor4InARow, create2DArray, deepCopy2DArray } from "../utilities";

import "../css/Board.css";

interface IBoardProps {
  gameOver: boolean;
  setGameOver: Dispatch<React.SetStateAction<boolean>>;
  setWinner: Dispatch<React.SetStateAction<number | null>>;
}

export function Board({ gameOver, setGameOver, setWinner }: IBoardProps): JSX.Element {
  const player1 = PLAYER_TOKEN_1;
  const player2 = PLAYER_TOKEN_2;

  // useLocalStorage is an useful hook from the usehooks-ts. Doubles as a useState variable and a local storage key-value pair.
  const [currentPlayer, setCurrentPlayer] = useLocalStorage("currentPlayer", player1);
  const [board, setBoard] = useLocalStorage<TCellValue[][]>(BOARD, create2DArray());
  const [lastMove, setLastMove] = useLocalStorage<IMove[]>("lastMove", []);

  const placeToken = (columnIndex: number): void => {
    if (gameOver) return;

    // Looking from the bottom up, first empty slot in the column. Reversing the 2D array to do this.
    const reversedBoard = [...board].reverse();
    const reverseRowIndex = reversedBoard.findIndex((row) => !row[columnIndex]);

    if (reverseRowIndex !== -1) {
      // Finding the proper row index in the correct 2d array.
      const rowIndex = board.length - 1 - reverseRowIndex;
      const boardCopy = deepCopy2DArray(board);

      boardCopy[rowIndex][columnIndex] = currentPlayer;
      setBoard(boardCopy);
      setLastMove([...lastMove, { rowIndex, columnIndex }]);
    }

    const nextPlayer = currentPlayer === player1 ? player2 : player1;
    setCurrentPlayer(nextPlayer);
  };

  const handleOnNewGameClick = (): void => {
    setLastMove([]);
    setBoard(create2DArray());
    setGameOver(false);
  };

  const handleOnUndoClick = (): void => {
    if (!lastMove) return;

    const boardCopy = deepCopy2DArray(board);
    const storedLastMove = lastMove.pop();

    if (!storedLastMove) return;

    boardCopy[storedLastMove?.rowIndex][storedLastMove?.columnIndex] = null;

    const nextPlayer = currentPlayer === player1 ? player2 : player1;

    setCurrentPlayer(nextPlayer);
    setLastMove([...lastMove]);
    setBoard(boardCopy);
  };

  useEffect(() => {
    const lastStoredMove = lastMove[lastMove.length - 1];

    if (!lastStoredMove) return;

    if (checkFor4InARow(board, lastStoredMove)) {
      setGameOver(true);
      setWinner(board[lastStoredMove.rowIndex][lastStoredMove.columnIndex]);
    } else {
      setGameOver(false);
      setWinner(null);
    }
  }, [board, lastMove]);

  return (
    <>
      <div className="btn-wrapper">
        <button className="btn new-game" onClick={handleOnNewGameClick}>
          New Game
        </button>
        <button className="btn undo" disabled={lastMove.length === 0} onClick={handleOnUndoClick}>
          Undo last move
        </button>
      </div>
      <div className="board">
        {board.map((row, index) => (
          <Row key={index} placeToken={placeToken} row={row} />
        ))}
      </div>
    </>
  );
}
