import React from "react";
import "./CardHolder.css";
import { BsCheckSquareFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPinAngleFill } from "react-icons/bs";

const Card = ({ eye, note, onDelete, onUpdate }) => {
  const updateText = (text) => {
    onUpdate(text, note.id);
  };

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
        <textarea
          type="text"
          className="cardInput"
          onChange={(event) => updateText(event.target.value)}
          value={note.text}
        />
        <div className="lower">
          <div className="date">{note.date}</div>
          <div className="functionality">
            {eye && (
              <div className="hide">
                <BsCheckSquareFill />
              </div>
            )}
            <div className="delete">
              <AiFillDelete onClick={() => onDelete(note.id)} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
