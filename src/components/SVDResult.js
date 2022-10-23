import React from "react";
import { SVD } from "svd-js";

const SVDResult = ({ matrix, setU, setV, setQ }) => {
  return (
    <>
      <h2>Step 2. Process Singular Value Decomposition</h2>
      <button
        onClick={() => {
          const { u, v, q } = SVD(matrix, "f");
          setU(u);
          setV(v);
          setQ(q);
        }}
      >
        Process!
      </button>
    </>
  );
};

export default SVDResult;
