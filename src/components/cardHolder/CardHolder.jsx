import React from "react";
import Card from "./Card";
import "./CardHolder.css";

const CardHolder = ({ notes, onDelete, onUpdate, onDone, eye }) => {
  const newarr = [...notes];
  return (
    <div className="cardHolder">
      {newarr.map((note, i) => (
        <Card
          key={i}
          note={note}
          text={note.text}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onDone={onDone}
          eye={eye}
        />
      ))}
    </div>
  );
};

export default CardHolder;
