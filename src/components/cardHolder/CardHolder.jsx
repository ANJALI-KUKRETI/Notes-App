import React from "react";
import Card from "./Card";
import "./CardHolder.css";

const CardHolder = ({ notes }) => {
  return (
    <div className="cardHolder">
      {notes.map((note) => (
        <Card key={note.id} note={note} />
      ))}
      {/* <Card
        note={{
          text: "kfansc",
          date: "22/02/2022",
          color: "yellow",
        }}
      />
      <Card
        note={{
          text: "kfansc",
          date: "22/02/2022",
          color: "rgb(193, 236, 127)",
        }}
      />
      <Card
        note={{
          text: "kfansc",
          date: "22/02/2022",
          color: "rgb(193, 236, 127)",
        }}
      />
      <Card
        note={{
          text: "kfansc",
          date: "22/02/2022",
          color: "rgb(193, 236, 127)",
        }}
      />
      <Card
        note={{
          text: "kfansc",
          date: "22/02/2022",
          color: "rgb(193, 236, 127)",
        }}
      /> */}
    </div>
  );
};

export default CardHolder;
