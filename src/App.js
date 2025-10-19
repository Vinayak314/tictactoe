import { useState, useEffect } from "react";
import Square from "./components/Square";
import {faHeart, faHeartBroken} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { height } from "@fortawesome/free-solid-svg-icons/fa0";

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const winner = calculateWinner(squares);
  let status;

  useEffect(() => {
    if (winner) {
      setShowOverlay(true);
    }
  }, [winner]);

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setXIsNext(!xIsNext);
    setSquares(nextSquares);
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
    setXIsNext(true);
  }

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = (<>Next Player: {xIsNext ? "X" : <FontAwesomeIcon icon={faHeart} className="heart"/>}</>)
   }

  return (
    <>
      <div className="center">
        <div className="status">{status}</div>
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
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
          <div
            className="overlay"
          >
            {winner == "O" ? (
              <>
                <FontAwesomeIcon icon={faHeart} className="heart" style={{ fontSize: '30px' }}/>
                <h1>You Stole My Heart :P</h1>
              </>
              ) : (
              <>
                <FontAwesomeIcon icon={faHeartBroken} className="heart" style={{ fontSize: '30px' }}/>
                <h1>You Broke My Heart :(</h1>
              </>)}
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
