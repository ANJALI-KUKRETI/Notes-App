import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import "./CardHolder.css";

const CardHolder = ({ notes, onDelete, onUpdate, onDone, eye }) => {
  const error = useSelector((state) => state.notes.err);
  console.log(error);
  const newarr = [...notes];
  return (
    <div className="cardHolder">
      {error}
      {newarr.map((note) => (
        <Card
          key={note.id}
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
