import React, { Component } from "react";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Number</th>
        <th>Name</th>
        <th>Picture</th>
      </tr>
    </thead>
  );
};

const TableBody = props => {
  const rows = props.characterData.map((row, index) => {
    const img =
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
      row.id +
      ".png";
    return (
      <tr key={index}>
        <td>{row.id}</td>
        <td>{row.name}</td>
        <td>
          <img src={img}></img>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

const Table = props => {
  const { characterData, removeCharacter } = props;

  return (
    <table>
      <TableHeader />
      <TableBody characterData={characterData} />
    </table>
  );
};

export default Table;
