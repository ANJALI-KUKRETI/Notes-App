import React, { useState } from "react";
import "./CardHolder.css";
import { BsCheckSquareFill } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPinAngleFill } from "react-icons/bs";

const Card = ({ eye, note, onDelete, onUpdate, onDone }) => {
  const [cardText, setCardText] = useState(note.text);

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
          onChange={(event) => setCardText(event.target.value)}
          value={cardText}
        />
        <div className="lower">
          <div className="date">{note.date}</div>
          <div className="functionality">
            {eye && (
              <div className="hide">
                <BsCheckSquareFill
                  onClick={() => onUpdate(cardText, note.id)}
                />
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
