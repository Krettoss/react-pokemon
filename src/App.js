import React, { Component } from "react";
import "./App.css";
import Table from "./Table";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends Component {
  state = {
    characters: [],
    selectedOption: [],
    types: [],
    filteredTypes: []
  };

  handleChange = selectedOption => {
    this.setState({ filteredTypes: [] });
    if (selectedOption !== null) {
      selectedOption.map(type => {
        const url = type.value;
        fetch(url)
          .then(result => result.json())
          .then(result => {
            this.setState({
              filteredTypes: parseSelectedTypes(result.pokemon).concat(
                this.state.filteredTypes
              )
            });
          });
      });
    }
    this.setState({ selectedOption });
  };

  componentDidMount() {
    const urlTypes = "https://pokeapi.co/api/v2/type";
    fetch(urlTypes)
      .then(result => result.json())
      .then(result => {
        this.setState({
          types: result.results
        });
      });

    const urlPokomons = "https://pokeapi.co/api/v2/pokemon?limit=150";
    fetch(urlPokomons)
      .then(result => result.json())
      .then(result => {
        this.setState({
          characters: result.results
        });
      });
  }

  render() {
    const { characters } = this.state;
    const { selectedOption } = this.state;
    const { types } = this.state;
    const { filteredTypes } = this.state;

    return (
      <div className="container">
        <h1> Pokemon </h1>
        <div className="col-md-4">
          <Select
            isMulti
            value={selectedOption}
            onChange={this.handleChange}
            options={parseTypes(types)}
          />
        </div>
        <div>
          <Table
            characterData={filterCharacters(
              parseCharacters(characters),
              filteredTypes
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;

function parseTypes(types) {
  return types.map(type => {
    return { label: type.name, value: type.url };
  });
}

function parseCharacters(characters) {
  return characters.map(character => {
    return { name: character.name, id: character.url.split("/")[6] };
  });
}

function parseSelectedTypes(characters) {
  let list = [];
  characters.map(character => {
    list.push(character.pokemon.url.split("/")[6]);
  });
  return list;
}

function filterCharacters(characters, filteredTypes) {
  return characters.filter(
    character =>
      filteredTypes.length === 0 || filteredTypes.indexOf(character.id) > -1
  );
}
