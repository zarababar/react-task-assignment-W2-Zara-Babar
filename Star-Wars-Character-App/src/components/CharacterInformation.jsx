import React, { useContext, useMemo } from 'react';
import { DataContext } from '../DataContext';

const CharacterInformation = ({ character }) => {
  const { homeWorlds } = useContext(DataContext);

  // Format and parse date
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

  // Memoize home world data lookup
  const homeWorldData = useMemo(() => {
    return homeWorlds.find(hw => hw.url === character?.homeworld);
  }, [homeWorlds, character?.homeworld]);

  if (!character) {
    return <div>Loading character information...</div>;
  }

  if (!homeWorldData) {
    return <div>Loading home world information...</div>;
  }

  return (
    <div className="w3-modal-content w3-animate-zoom">
      <h1>{character.name}</h1>
      <p>Height: {character.height} metres</p>
      <p>Mass: {character.mass} kg</p>
      <p>Creation Date: {parseDateString(character.created)}</p>
      <p>Birth Year: {character.birth_year}</p>
      <p>Number of Films: {character.films.length}</p>
      <div>
        <h2>Home World</h2>
        <p>Name: {homeWorldData.name}</p>
        <p>Terrain: {homeWorldData.terrain}</p>
        <p>Climate: {homeWorldData.climate}</p>
        <p>Number of Residents: {homeWorldData.residents.length}</p>
      </div>
    </div>
  );
};

export default CharacterInformation;
