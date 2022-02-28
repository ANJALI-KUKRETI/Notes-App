import React from "react";
import "./CardHolder.css";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPinAngleFill } from "react-icons/bs";

const Card = ({ note }) => {
  return (
    <>
      <div
        className="card"
        style={{
          backgroundColor: note.color,
        }}
      >
        <div className="pin">
          <BsFillPinAngleFill className="in" />
        </div>
        <textarea type="text" className="cardInput" />
        <div className="lower">
          <div className="date">{note.date}</div>
          <div className="functionality">
            <div className="edit">
              <FaEdit />
            </div>
            <div className="delete">
              <AiFillDelete />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
