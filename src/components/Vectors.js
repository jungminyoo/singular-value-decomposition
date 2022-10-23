import React from "react";

export const randomMatrix = (amount, dim) => {
  const matrix = [];

  const pushRandom = (bound, i) => {
    matrix[i].push(Math.floor(Math.random() * (bound * 2) - bound));
  };

  for (let i = 0; i < amount; i++) {
    matrix.push([]);
    for (let j = 0; j < dim; j++) {
      switch (j) {
        case 1:
          pushRandom(100, i);
          break;
        case 5:
          pushRandom(100, i);
          break;
        case 7:
          pushRandom(100, i);
          break;
        case 11:
          pushRandom(100, i);
          break;
        case 15:
          pushRandom(100, i);
          break;
        case 20:
          matrix[i].push(matrix[i][15] * -3);
          break;
        case 25:
          matrix[i].push(matrix[i][11] * 2);
          break;
        case 40:
          matrix[i].push(matrix[i][7] * 4);
          break;
        case 51:
          matrix[i].push(matrix[i][5] * -5);
          break;
        case 75:
          matrix[i].push(matrix[i][1] * -2);
          break;
        default:
          if (j % 2 === 0) pushRandom(20, i);
          else pushRandom(5, i);
      }
    }
  }

  return matrix;

  // for (let i = 0; i < dim; i++) {
  //   matrix.push([]);
  // }
  // for (let i = 0; i < amount; i++) {
  //   for (let j = 0; j < dim; j++) {
  //     switch (j) {
  //       case 1:
  //         pushRandom(100, j);
  //         break;
  //       case 5:
  //         pushRandom(100, j);
  //         break;
  //       case 7:
  //         pushRandom(100, j);
  //         break;
  //       case 11:
  //         pushRandom(100, j);
  //         break;
  //       case 15:
  //         pushRandom(100, j);
  //         break;
  //       case 20:
  //         matrix[j].push(matrix[15][i] * -3);
  //         break;
  //       case 25:
  //         matrix[j].push(matrix[11][i] * 2);
  //         break;
  //       case 40:
  //         matrix[j].push(matrix[7][i] * 4);
  //         break;
  //       case 51:
  //         matrix[j].push(matrix[5][i] * -5);
  //         break;
  //       case 75:
  //         matrix[j].push(matrix[1][i] * -2);
  //         break;
  //       default:
  //         if (j % 2 === 0) pushRandom(20, j);
  //         else pushRandom(5, j);
  //     }
  //   }
  // }
};

const Vectors = ({ amount, dim, setMatrix }) => {
  return (
    <>
      <h2>
        Step 1. Generate {dim}-D Vectors {amount}
      </h2>
      <button
        onClick={() => {
          const matrix = randomMatrix(amount, dim);
          setMatrix(matrix);
        }}
      >
        Generate!
      </button>
    </>
  );
};

export default Vectors;
