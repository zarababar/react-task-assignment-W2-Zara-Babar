import React, { useMemo } from 'react';

const CharacterInformation = ({ character, homeWorlds }) => {
  console.log(homeWorlds)
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

  // Memoize formatted current date
  const formattedDate = useMemo(() => formatDate(new Date()), []);

  const homeWorldData = useMemo(() => {
    if (character?.homeworld) {
      return homeWorlds.find(hw => hw.url === character.homeworld) || { name: 'Unknown', terrain: 'Unknown', climate: 'Unknown', residents: [] };
    }
    return { name: 'Unknown', terrain: 'Unknown', climate: 'Unknown', residents: [] };
  }, [homeWorlds, character?.homeworld]);

  return (
    <div className="w3-modal-content w3-animate-zoom">
      <div className="character-info">
        <h2>{character.name}</h2>
        <p><strong>Height:</strong> {character.height} metres</p>
        <p><strong>Mass:</strong> {character.mass} kg</p>
        <p><strong>Creation Date:</strong> {parseDateString(character.created)}</p>
        <p><strong>Birth Year:</strong> {character.birth_year}</p>
        <p><strong>Number of Films:</strong> {character.films.length}</p>
      </div>
      <div className="home-world-info">
        <h3>Home World</h3>
        <p><strong>Name:</strong> {homeWorldData.name}</p>
        <p><strong>Terrain:</strong> {homeWorldData.terrain}</p>
        <p><strong>Climate:</strong> {homeWorldData.climate}</p>
        <p><strong>Number of Residents:</strong> {homeWorldData.residents.length}</p>
      </div>
    </div>

  );
};

export default CharacterInformation;
