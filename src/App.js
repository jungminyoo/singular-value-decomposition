import React, { useState } from "react";
import ErrorCheck from "./components/ErrorCheck";
import SVDResult from "./components/SVDResult";
import Matrix from "./components/Vectors";

const App = () => {
  const [matrixA, setMatrixA] = useState([]);
  const [u, setU] = useState([]);
  const [v, setV] = useState([]);
  const [q, setQ] = useState([]);

  return (
    <>
      <h1>SVD(Singular Value Decomposition) Tester</h1>
      <Matrix amount={1000} dim={100} setMatrix={setMatrixA} />
      {matrixA.length !== 0 && <h3>Matrix A Generated.</h3>}
      {matrixA.length !== 0 && (
        <>
          <SVDResult matrix={matrixA} setQ={setQ} setU={setU} setV={setV} />
        </>
      )}
      {v.length !== 0 && (
        <>
          <ErrorCheck v={v} />
        </>
      )}
    </>
  );
};

export default App;
