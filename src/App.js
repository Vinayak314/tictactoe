import { useState, useEffect } from "react";
import Square from "./components/Square";
import { faHeart as faHeartSolid, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [gameMode, setGameMode] = useState("single");
  const winner = calculateWinner(squares);
  const gameActive = squares.some(sq => sq !== null) && !winner;
  let status;

  useEffect(() => {
    if (winner) {
      setShowOverlay(true);
    } else if (!winner && squares.every((sq) => sq !== null)) {
      const timer = setTimeout(() => {
        reset();
      }, 1000);
      return clearTimeout(timer);
    }

    if (gameMode == "single" && xIsNext && !winner) {
      const timer = setTimeout(() => makeBotMove(squares), 1000);
      return () => clearTimeout(timer);
    }
  }, [winner, squares, xIsNext, gameMode]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (gameMode === "two") {
      nextSquares[i] = xIsNext ? "X" : "O";
      setXIsNext(!xIsNext);
    } else {
      nextSquares[i] = "O";
      setXIsNext(true);
    }

    setSquares(nextSquares);
  }

  function makeBotMove(squares) {
    const emptySquares = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((v) => v !== null);
    if (emptySquares.length === 0 || calculateWinner(squares)) return;

    const randomIndex =
      emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const nextSquares = squares.slice();
    nextSquares[randomIndex] = "X";
    setSquares(nextSquares);
    setXIsNext(false);
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
        return squares[a];
      }
    }

    return null;
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setShowOverlay(false);
    setXIsNext(false);
  }

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = (
      <>
        Next Player:{" "}
        {xIsNext ? "X" : <FontAwesomeIcon icon={faHeartSolid} className="heart" />}
      </>
    );
  }

  return (
    <>
      <div className="center">
        <div className="mode-toggle">
          <label className="custom-radio">
            <input
              type="radio"
              value="single"
              checked={gameMode === "single"}
              disabled={gameActive}
              onChange={() => setGameMode("single")}
            />
            <FontAwesomeIcon
              icon={gameMode === "single" ? faHeartSolid : faHeartRegular}
              size="1x"
            />
            <span className="label-text">Single Player</span>
          </label>

          <label className="custom-radio">
            <input
              type="radio"
              value="two"
              checked={gameMode === "two"}
              disabled={gameActive}
              onChange={() => setGameMode("two")}
            />
            <FontAwesomeIcon
              icon={gameMode === "two" ? faHeartSolid : faHeartRegular}
              size="1x"
            />
            <span className="label-text">Two Player</span>
          </label>
        </div>

        <div className="status">{status}</div>
        <div className="board-row">
          <Square
            value={squares[0]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(0) : null
            }
          />
          <Square
            value={squares[1]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(1) : null
            }
          />
          <Square
            value={squares[2]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(2) : null
            }
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[3]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(3) : null
            }
          />
          <Square
            value={squares[4]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(4) : null
            }
          />
          <Square
            value={squares[5]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(5) : null
            }
          />
        </div>
        <div className="board-row">
          <Square
            value={squares[6]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(6) : null
            }
          />
          <Square
            value={squares[7]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(7) : null
            }
          />
          <Square
            value={squares[8]}
            onSquareClick={() =>
              !xIsNext || gameMode === "two" ? handleClick(8) : null
            }
          />
        </div>

        <div>
          <button className="restart" onClick={() => reset()}>
            Restart Game
          </button>
        </div>
      </div>

      <div>
        {/* <button onClick={() => setShowOverlay(true)}>Show Overlay</button> */}

        {showOverlay && (
          <div className="overlay">
            {winner == "O" ? (
              <>
                <FontAwesomeIcon
                  icon={faHeartSolid}
                  className="heart"
                  style={{ fontSize: "30px" }}
                />
                <h1>You Won My Heart :P</h1>
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faHeartBroken}
                  className="heart"
                  style={{ fontSize: "30px" }}
                />
                <h1>You Broke My Heart :(</h1>
              </>
            )}
            <div>
              <button className="restart" onClick={() => reset()}>
                Restart Game
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
