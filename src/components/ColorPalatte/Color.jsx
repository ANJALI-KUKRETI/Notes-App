import React from "react";
import { BsCircleFill } from "react-icons/bs";

const Color = ({ color }) => {
  return (
    <li>
      <BsCircleFill
        style={{
          color,
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      />
    </li>
  );
};

export default Color;
