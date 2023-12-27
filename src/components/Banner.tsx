import { useEffect } from "react";
import "../css/Banner.css";

interface IBannerProps {
  gameOver: boolean;
  winner: number | null;
}

export function Banner({ gameOver, winner }: IBannerProps): JSX.Element {
  const winningPlayer = winner === 1 ? "red" : "yellow";

  const handleOnClose = () => {
    const bannerWrapper = document.querySelector(".banner-wrapper");
    bannerWrapper?.classList.remove("fade-in");
    bannerWrapper?.classList.add("fade-out");

    setTimeout(() => {
      bannerWrapper?.classList.add("hide");
    }, 500);
  };

  useEffect(() => {
    if (!gameOver) return;

    const bannerWrapper = document.querySelector(".banner-wrapper");

    bannerWrapper?.classList.remove("hide");
    bannerWrapper?.classList.remove("fade-out");
    bannerWrapper?.classList.add("fade-in");
  }, [gameOver]);

  return (
    <div className="banner-wrapper">
      <div className="banner">
        <h1>
          Congratulations! <span className={`winner ${winningPlayer}`}>{winningPlayer}</span> has
          won this round!
        </h1>
        <span className="close material-symbols-outlined" onClick={handleOnClose}>
          close
        </span>
      </div>
    </div>
  );
}
