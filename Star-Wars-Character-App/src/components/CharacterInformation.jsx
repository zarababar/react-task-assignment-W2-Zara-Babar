import React, { useContext } from 'react';
import { DataContext } from '../DataContext';

const CharacterInformation = ({ character }) => {
  const { homeWorlds } = useContext(DataContext);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

const parseDateString = (dateString) => {
    const date = new Date(dateString);
    return formatDate(date);
};

  if (!character) {
    return <div>Loading...</div>;
  }
  // Find the homeworld data based on the URL
  const homeWorldData = homeWorlds.find(hw => 
    hw.url === character.homeworld,
);

  return (
    <div className="w3-modal-content w3-animate-zoom">
      <h1>{character.name}</h1>
      <p>Height: {character.height} metres</p>
      <p>Mass: {character.mass} kg</p>
      <p>Creation Date: {parseDateString(character.created)}</p>
      <p>Birth Year: {character.birth_year}</p>
      <p>Number of Films: {character.films.length}</p>
      {homeWorldData ? (
        <div>
          <h2>Home World</h2>
          <p>Name: {homeWorldData.name}</p>
          <p>Terrain: {homeWorldData.terrain}</p>
          <p>Climate: {homeWorldData.climate}</p>
          <p>Number of Residents: {homeWorldData.residents.length}</p>
        </div>
      ) : (
        <div>Loading Home World...</div>
      )}
    </div>
  );
};

export default CharacterInformation;
