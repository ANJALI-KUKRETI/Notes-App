import React from "react";
import Card from "./Card";
import "./CardHolder.css";

const CardHolder = ({ notes, onDelete, onUpdate, onDone, eye }) => {
  // console.log(notes);
  const newarr = [...notes];
  // console.log(newarr);
  return (
    <div className="cardHolder">
      {newarr.map((note) => (
        <Card
          key={Math.random()}
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
