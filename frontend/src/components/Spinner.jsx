import React from "react";
import RingLoader from "react-spinners/RingLoader";

function Spinner() {
  return (
    <div className="flex flex-col w-full h-[100vh]  items-center justify-center">
      <RingLoader className="mb-3" color={"#000"} size={50} />
    </div>
  );
}

export default Spinner;
