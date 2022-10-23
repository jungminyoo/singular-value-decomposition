import { Chart, registerables } from "chart.js";
import { create, all } from "mathjs";
import React, { useEffect, useState } from "react";
import { randomMatrix } from "./Vectors";
const linearAlgebra = require("linear-algebra")();

Chart.register(...registerables);
const math = create(all);
const Matrix = linearAlgebra.Matrix;

const ErrorCheck = ({ v }) => {
  const [numPC, setNumPC] = useState(10);
  const [matrixX] = useState(randomMatrix(100, 100));
  const [avgDis, setAvg] = useState(0);
  const [visual, setVisual] = useState(false);

  const checkError = (num) => {
    let hatMatrixX = [];
    let total = 0;

    const matX = new Matrix(matrixX);
    const basisV = new Matrix(v.slice(0, num));

    const combinations = getCombinations(basisV, matX);

    combinations.forEach((combination, index1) => {
      hatMatrixX.push([]);
      combination.forEach((item, index2) => {
        const eigenI = new Matrix([basisV.data[index2]]);
        hatMatrixX[index1].push(item.dot(eigenI).data);
      });
      //   const combination = new Matrix(item);
      //   const eigenI = new Matrix([basisV.data[index]]);
      //   hatMatrixX.push(...combination.dot(eigenI).data);
    });

    matX.data.forEach((item1, index) => {
      const hatMatX = Matrix.zero(1, 100);
      hatMatrixX[index].forEach((item2) => {
        const curMat = new Matrix(item2);
        hatMatX.plus_(curMat);
      });
      const X = new Matrix(item1);
      console.log(index, X, hatMatX);
      total = total + math.norm(...X.minus(hatMatX).data);
    });

    return total / v.length;
  };

  const getCombinations = (basisV, matX) => {
    const combinations = [];

    matX.data.forEach((item, index) => {
      const X = new Matrix([item]);
      combinations.push([]);
      basisV.data.forEach((eigen) => {
        const eigenI = new Matrix([eigen]);
        combinations[index].push(X.dot(eigenI.trans()));
      });
    });

    return combinations;
  };

  const visualize = () => {
    const avgData = [];
    const labels = [];

    for (let i = 10; i <= v.length; i = i + 5) {
      labels.push(i.toString());
      //   avgData.push(Math.floor(Math.abs(checkError(i) / 10e170)));
      avgData.push(checkError(i));
    }

    const data = {
      labels,
      datasets: [
        {
          label: "Average Distance",
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgb(255, 99, 132)",
          data: avgData,
        },
      ],
    };

    const config = {
      type: "line",
      data,
      options: {
        responsive: false,
        scales: {
          y: {
            min: 0,
            max: 1000,
          },
        },
      },
    };

    console.log(data, config);

    const avgChart = new Chart(document.getElementById("avgChart"), config);
  };

  useEffect(() => {
    setAvg(checkError(numPC));
  }, [numPC]);

  useEffect(() => {
    if (visual) {
      visualize();
    }
  }, [visual]);

  return (
    <>
      <h2>Step 3. Set Principal Components & Check Vector Average Distances</h2>
      <h3>Sample Vectors X (100-D X 100) Generated.</h3>
      <label htmlFor="numPC">
        Number of Principal Components (Current: {numPC})
      </label>
      <input
        type="range"
        id="numPC"
        step="5"
        min="10"
        max={v.length}
        value={numPC}
        onChange={(e) => setNumPC(e.target.value)}
      />
      <h4>Average Distance: {avgDis}</h4>
      <button onClick={() => setVisual(true)}>Visualize!</button>
      {visual && <canvas id="avgChart" width="600" height="400"></canvas>}
    </>
  );
};

export default ErrorCheck;
