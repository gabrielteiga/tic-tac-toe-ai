import React, { useState, useRef, useEffect } from "react";
import "./TicTacToe.css";
import circle_img from "../../assets/Red_circle.png";
import cross_img from "../../assets/Red_X.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill("b"));
  const [difficulty, setDifficulty] = useState("easy");
  const titleRef = useRef(null);

  const boxRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);

  const minimax = (newData, isMaximizing) => {
    const winner = checkwin(newData);
    if (winner === "x") return -1;
    if (winner === "o") return 1;
    if (newData.every(cell => cell !== "b")) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i] === "b") {
          newData[i] = "o";
          let score = minimax(newData, false);
          newData[i] = "b";
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < newData.length; i++) {
        if (newData[i] === "b") {
          newData[i] = "x";
          let score = minimax(newData, true);
          newData[i] = "b";
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const bestMove = (newData) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < newData.length; i++) {
      if (newData[i] === "b") {
        newData[i] = "o";
        let score = minimax(newData, false);
        newData[i] = "b";
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    debugBestMove();
    return move;
  };

  const randomMove = (newData) => {
    const availableMoves = newData.map((val, index) => val === "b" ? index : null).filter(val => val !== null);
    debugRandomMove();
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const toggle = async (e, num) => {
    console.log("iniciando toggle")
    if (lock || data[num] !== "b") {
      console.log('aqui entrou no if do lock toggle')
      return;
    }
    
    console.log("count: ",count)
    const newData = [...data];
    // if (count % 2 === 0) {
      newData[num] = "x";
      e.target.innerHTML = `<img src='${cross_img}' alt='X' class='symbol'>`;
      setData(newData);
      setCount(count + 2);
      console.log("count: ",count)

      const winner = checkwin(newData);
      console.log(count)
      console.log(winner)
      if (winner) {
        won(winner);
      } else {
        computerPlay(newData);
      // }
    }
    console.log("finalizando toggle")
  };

  const computerPlay = (newData) => {
    if (lock) return;

    let computerMove;
    const random = Math.random();
    console.log("antes")
    
    if (difficulty === "easy") {
      if (random < 0.25) {
        computerMove = bestMove(newData);
      } else {
        computerMove = randomMove(newData);
      }
    } else if (difficulty === "medium") {
      if (random < 0.5) {
        computerMove = randomMove(newData);
      } else {
        computerMove = bestMove(newData);
      }
    } else if (difficulty === "hard") {
      computerMove = bestMove(newData);
    } else {
      computerMove = randomMove(newData);
    }

    if (computerMove !== undefined) {
      newData[computerMove] = "o";
      boxRefs.current[computerMove].current.innerHTML = `<img src='${circle_img}' alt='O' class='symbol'>`;
      setData(newData);
      setCount(count + 1);
      const winner = checkwin(newData);
      if (winner) {
        won(winner);
      }
    }
  };

  const checkwin = (newData) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (newData[a] === newData[b] && newData[a] === newData[c] && newData[a] !== "b") {
        return newData[a];
      }
    }

    return null;
  };

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Winner: <img src=${cross_img} alt='X' class='win'>`;
    } else {
      titleRef.current.innerHTML = `Winner: <img src=${circle_img} alt='O' class='win'>`;
    }
  }

  const reset = () => {
    setData(Array(9).fill("b"));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "";
    boxRefs.current.forEach(ref => ref.current.innerHTML = "");
  }

  function debugBestMove() {
    console.log("Best move");
  }

  function debugRandomMove() {
    console.log("Random move");
  }

  return (
    <div className="container">
      <div className="inicial">
        <h1 className="title" ref={titleRef}></h1>
        <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
          <option value="easy">Fácil</option>
          <option value="medium">Médio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>
      <div className="game">
        <div className="board">
          <div className="row">
            <div className="cell" ref={boxRefs.current[0]} onClick={(e) => toggle(e, 0)}></div>
            <div className="cell" ref={boxRefs.current[1]} onClick={(e) => toggle(e, 1)}></div>
            <div className="cell" ref={boxRefs.current[2]} onClick={(e) => toggle(e, 2)}></div>
          </div>
          <div className="row">
            <div className="cell" ref={boxRefs.current[3]} onClick={(e) => toggle(e, 3)}></div>
            <div className="cell" ref={boxRefs.current[4]} onClick={(e) => toggle(e, 4)}></div>
            <div className="cell" ref={boxRefs.current[5]} onClick={(e) => toggle(e, 5)}></div>
          </div>
          <div className="row">
            <div className="cell" ref={boxRefs.current[6]} onClick={(e) => toggle(e, 6)}></div>
            <div className="cell" ref={boxRefs.current[7]} onClick={(e) => toggle(e, 7)}></div>
            <div className="cell" ref={boxRefs.current[8]} onClick={(e) => toggle(e, 8)}></div>
          </div>
        </div>
        <button className="reset" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default TicTacToe;
