import React, { Component, useState, useEffect } from 'react';

const PokemonDetails = ({ pokemonName }) => {
  const [pokemonInfo, setPokemonInfo] = useState(null);

  useEffect(() => {
    const fetchPokemonInfo = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemonInfo(data);
      } catch (error) {
        console.error('Error fetching Pokemon info:', error);
      }
    };

    fetchPokemonInfo();
  }, [pokemonName]);

  return (
    <div className='pokemon-details'>
      <h1>{pokemonInfo ? `${pokemonInfo.name}` : 'Pokemon Details'}</h1>
      {pokemonInfo ? (
        <div>
          <img
            src={pokemonInfo.sprites.front_default}
            alt={`Front view of ${pokemonInfo.name}`}
          />
          <p>normal</p>
          <img src={pokemonInfo.sprites.front_shiny}></img >
          <p>shiny</p>
          <p>Name: {pokemonInfo.name}</p>
          <p>Height: {pokemonInfo.height} dm</p>
          <p>Weight: {pokemonInfo.weight} hg</p>
          <p>Base Experience: {pokemonInfo.base_experience}</p>
          <h2>Abilities:</h2>
          <ul>
            {pokemonInfo.abilities.map((ability, index) => (
              <li key={index}>
                <strong>Name:</strong> {ability.ability.name},{' '}
                <strong>Is Hidden:</strong> {ability.is_hidden ? 'Yes' : 'No'},{' '}
              </li>
            ))}
          </ul>
          {}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };



  return (
    <div>
      <input
        type="text"
        placeholder="Enter Pokemon name or Id"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button onClick={handleSearch} >Search</button>
    </div>
  );
};

const App = () => {
  const [searchedPokemon, setSearchedPokemon] = useState('charmander');

  const handleSearch = (pokemonName) => {
    setSearchedPokemon(pokemonName);
  };

  return (
    <main>
      <Searchbar onSearch={handleSearch} />
      <PokemonDetails pokemonName={searchedPokemon} />
    </main>
  );
};

export default App;
