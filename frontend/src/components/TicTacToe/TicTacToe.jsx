import React, { useState, useRef } from "react";
import axios from 'axios';
import "./TicTacToe.css";
import circle_img from "../../assets/Red_circle.png";
import cross_img from "../../assets/Red_X.png";

const TicTacToe = () => {
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [data, setData] = useState(Array(9).fill("b"));
  const titleRef = useRef(null);

  const boxRefs = useRef([React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef(), React.createRef()]);
  const knnRef = useRef(null);
  const treeRef = useRef(null);
  const mlpRef = useRef(null);

  const toggle = async (e, num) => {
    if (lock || data[num] !== "b") {
      return;
    }

    const newData = [...data];
    if (count % 2 === 0) {
      newData[num] = "x";
      e.target.innerHTML = `<img src='${cross_img}' alt='X'>`;
    } else {
      newData[num] = "o";
      e.target.innerHTML = `<img src='${circle_img}' alt='O'>`;
    }
    setData(newData);
    setCount(count + 1);

    const args = newData.map(val => (val === "" ? "b" : val));

    checkwin(newData);
    await checkKnn(args);
    await checkTree(args);
    await checkMlp(args);
  };

  const checkwin = (newData) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (const [a, b, c] of lines) {
      if (newData[a] && newData[a] === newData[b] && newData[a] === newData[c] && newData[a] !== "b") {
        won(newData[a]);
        return;
      }
    }
  }

  const won = (winner) => {
    setLock(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Winner: <img src=${cross_img} alt='X'>`;
    } else {
      titleRef.current.innerHTML = `Winner: <img src=${circle_img} alt='O'>`;
    }
  }

  const checkKnn = async (args) => {
    try {
      const response = await axios.post('http://localhost:8080/knn/predict', { data: args });
      const winner = response.data;
      updatePrediction(winner, knnRef, "KNN");
    } catch (error) {
      console.error(`Error in KNN prediction: ${error}`);
    }
  }

  const checkTree = async (args) => {
    try {
      const response = await axios.post('http://localhost:8080/dtree/predict', { data: args });
      const winner = response.data;
      updatePrediction(winner, treeRef, "Tree");
    } catch (error) {
      console.error(`Error in Tree prediction: ${error}`);
    }
  }

  const checkMlp = async (args) => {
    try {
      const response = await axios.post('http://localhost:8080/mlp/predict', { data: args });
      const winner = response.data;
      updatePrediction(winner, mlpRef, "MLP");
    } catch (error) {
      console.error(`Error in MLP prediction: ${error}`);
    }
  }

  const updatePrediction = (winner, ref, type) => {
    if (winner === "w") {
      return;}
    ref.current.innerHTML = `${type}: ${winner}`;
  }

  const reset = () => {
    setData(Array(9).fill("b"));
    setCount(0);
    setLock(false);
    titleRef.current.innerHTML = "";
    knnRef.current.innerHTML = "";
    treeRef.current.innerHTML = "";
    mlpRef.current.innerHTML = "";
    boxRefs.current.forEach(ref => ref.current.innerHTML = "");
  }

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}></h1>
          <div className="title" ref={knnRef}></div>
          <div className="title" ref={treeRef}></div>
          <div className="title" ref={mlpRef}></div>
      <div className="board">
        <div className="row row1">
          <div className="cell" ref={boxRefs.current[0]} onClick={(e) => toggle(e, 0)}></div>
          <div className="cell" ref={boxRefs.current[1]} onClick={(e) => toggle(e, 1)}></div>
          <div className="cell" ref={boxRefs.current[2]} onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row row2">
          <div className="cell" ref={boxRefs.current[3]} onClick={(e) => toggle(e, 3)}></div>
          <div className="cell" ref={boxRefs.current[4]} onClick={(e) => toggle(e, 4)}></div>
          <div className="cell" ref={boxRefs.current[5]} onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row row3">
          <div className="cell" ref={boxRefs.current[6]} onClick={(e) => toggle(e, 6)}></div>
          <div className="cell" ref={boxRefs.current[7]} onClick={(e) => toggle(e, 7)}></div>
          <div className="cell" ref={boxRefs.current[8]} onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};

export default TicTacToe;