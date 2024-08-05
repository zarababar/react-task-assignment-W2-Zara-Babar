import React, { useContext, useState, useRef, useMemo, useCallback } from 'react';
import { DataContext } from './DataContext';
import Search from './components/Search';
import Characters from './components/Characters';
import Header from './components/Header';

const App = () => {
  const { characters, homeWorlds, species, films, search, setSearch } = useContext(DataContext);
  const [filters, setFilters] = useState({
    homeWorld: '',
    species: '',
    film: ''
  });
  const timeoutRef = useRef(null);

  // Debounce search input
  const handleSearch = useCallback((query) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      if (query.length >= 2) {
        setSearch(query);
      } else if (query.length === 0) {
        setSearch('');
      }
    }, 1000);
  }, [setSearch]);

  // Handle filter changes
  const handleFilterChange = useCallback((type) => (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: event.target.value
    }));
  }, []);

  // Memoize filtered characters
  const filteredChars = useMemo(() => {
    return characters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(search.toLowerCase());
      const matchesHomeWorld = filters.homeWorld ? character.homeworld === filters.homeWorld : true;
      const matchesSpecies = filters.species ? character.species.includes(filters.species) : true;
      const matchesFilm = filters.film ? character.films.includes(filters.film) : true;

      return matchesSearch && matchesHomeWorld && matchesSpecies && matchesFilm;
    });
  }, [characters, search, filters]);

  // Function to get unique values based on a key
  const getUniqueOptions = useCallback((options, key) => {
    const uniqueMap = new Map();
    options.forEach(option => {
      uniqueMap.set(option[key], option);
    });
    return Array.from(uniqueMap.values());
  }, []);

  // Memoize unique options
  const uniqueHomeWorlds = useMemo(() => getUniqueOptions(homeWorlds, 'url'), [homeWorlds, getUniqueOptions]);
  const uniqueSpecies = useMemo(() => getUniqueOptions(species, 'url'), [species, getUniqueOptions]);
  const uniqueFilms = useMemo(() => getUniqueOptions(films, 'url'), [films, getUniqueOptions]);

  return (
    <>
      <Header />
      <div className="filter-container">
      <Search onSearch={handleSearch} />
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
      </div>
      <Characters characters={filteredChars} />
    </>
  );
}

export default App;
