import React from 'react';

const Filters = ({ filters, handleFilterChange, resetFilters, uniqueHomeWorlds, uniqueSpecies, uniqueFilms }) => {
  return (
    <div className='filter-container'>
      <label htmlFor="homeworld-filter">Homeworld:</label>
      <select id="homeworld-filter" value={filters.homeWorld} onChange={handleFilterChange('homeWorld')}>
        <option value="">All</option>
        {uniqueHomeWorlds.map(homeworld => (
          <option key={homeworld.url} value={homeworld.url}>{homeworld.name}</option>
        ))}
      </select>

      <label htmlFor="species-filter">Species:</label>
      <select id="species-filter" value={filters.species} onChange={handleFilterChange('species')}>
        <option value="">All</option>
        {uniqueSpecies.map(specie => (
          <option key={specie.url} value={specie.url}>{specie.name}</option>
        ))}
      </select>

      <label htmlFor="film-filter">Film:</label>
      <select id="film-filter" value={filters.film} onChange={handleFilterChange('film')}>
        <option value="">All</option>
        {uniqueFilms.map(film => (
          <option key={film.url} value={film.url}>{film.title}</option>
        ))}
      </select>
      <button className="reset-button" onClick={resetFilters}>Reset Filters</button>

    </div>
  );
};

export default Filters;
