import React from "react";

import "./ColorPalatte.css";
import Color from "./Color";

const ColorPalatte = () => {
  return (
    <div className="palatte">
      <ul>
        <Color color="aqua" />
        <Color color="rgb(247, 192, 125)" />
        <Color color="rgb(223, 169, 178)" />
        <Color color="rgb(193, 236, 127)" />
        <Color color="rgb(131, 206, 241)" />
        <Color color="rgb(238, 238, 113)" />
        <Color color="rgb(240, 116, 116)" />
        <Color color="rgb(241, 88, 241)" />
        <Color color="rgb(238, 175, 39)" />
      </ul>
    </div>
  );
};

export default ColorPalatte;
