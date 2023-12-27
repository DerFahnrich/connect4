import { useState } from "react";
import { Board } from "./components";
import { Banner } from "./components/Banner";

import "./css/App.css";

export function App(): JSX.Element {
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<number | null>(null);

  return (
    <>
      <Board gameOver={gameOver} setGameOver={setGameOver} setWinner={setWinner} />
      <Banner gameOver={gameOver} winner={winner} />
    </>
  );
}
