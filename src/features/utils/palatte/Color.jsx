import React from "react";
import ReactTooltip from "react-tooltip";
import { BsCircleFill } from "react-icons/bs";
import "./palatte.css";

const Color = ({ color, addNote }) => {
  return (
    <li>
      <div
        data-tip="📌 Post it"
        data-for="toolTip1"
        data-place="left"
        data-background-color={color}
      >
        <BsCircleFill
          style={{
            color,
            fontSize: "1.4rem",
            cursor: "pointer",
          }}
          onClick={() => addNote(color)}
        />
      </div>
      <ReactTooltip class="tooltip" id="toolTip1" />
    </li>
  );
};

export default Color;
