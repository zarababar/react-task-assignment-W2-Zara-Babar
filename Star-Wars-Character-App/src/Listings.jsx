import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Search from './components/Search';
import Characters from './components/Characters';
import Header from './components/Header';

const Listings = () => {
  const [data, setData] = useState({
    characters: [],
    homeWorlds: [],
    species: [],
    films: []
  });
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    homeWorld: '',
    species: '',
    film: ''
  });
  const timeoutRef = useRef(null);
  const location = useLocation();
  const username = location.state?.username || 'Guest';
  console.log(location.state?.username)

  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Navigate to="/" />; // Redirect to Login if not authenticated
  }


  const fetchData = async () => {
    try {
      const charResponse = await axios.get('https://swapi.dev/api/people/');
      const charactersData = charResponse.data.results;

      const homeWorldUrls = charactersData && charactersData.map(character => character.homeworld);
      const speciesUrls = charactersData.flatMap(character => character.species);
      const filmUrls = charactersData.flatMap(character => character.films);

      const [homeWorldResponses, speciesResponses, filmResponses] = await Promise.all([
        Promise.all(homeWorldUrls.map(url => axios.get(url))),
        Promise.all(speciesUrls.map(url => axios.get(url))),
        Promise.all(filmUrls.map(url => axios.get(url)))
      ]);

      const homeWorldsData = homeWorldResponses.map(response => response.data);
      const speciesData = speciesResponses.map(response => response.data);
      const filmsData = filmResponses.map(response => response.data);

      setData({
        characters: charactersData,
        homeWorlds: homeWorldsData,
        species: speciesData,
        films: filmsData
      });
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = useCallback((query) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearch(query);
    }, 1000);
  }, [setSearch]);

  const handleFilterChange = useCallback((type) => (event) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [type]: event.target.value
    }));
  }, []);

  const resetFilters = () => {
    setFilters({
      homeWorld: '',
      species: '',
      film: ''
    });
  };

  const filteredChars = useMemo(() => {
    return data.characters.filter(character => {
      const matchesSearch = character.name.toLowerCase().includes(search.toLowerCase());
      const matchesHomeWorld = filters.homeWorld ? character.homeworld === filters.homeWorld : true;
      const matchesSpecies = filters.species ? character.species.includes(filters.species) : true;
      const matchesFilm = filters.film ? character.films.includes(filters.film) : true;
      return matchesSearch && matchesHomeWorld && matchesSpecies && matchesFilm;
    });
  }, [data.characters, search, filters]);

  const getUniqueOptions = useCallback((options, key) => {
    const uniqueMap = new Map();
    options.forEach(option => {
      uniqueMap.set(option[key], option);
    });
    return Array.from(uniqueMap.values());
  }, []);

  const uniqueHomeWorlds = useMemo(() => getUniqueOptions(data.homeWorlds, 'url'), [data.homeWorlds, getUniqueOptions]);
  const uniqueSpecies = useMemo(() => getUniqueOptions(data.species, 'url'), [data.species, getUniqueOptions]);
  const uniqueFilms = useMemo(() => getUniqueOptions(data.films, 'url'), [data.films, getUniqueOptions]);

  return (
    <>
      <Header username={username} />
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
        <button className="reset-button" onClick={resetFilters}>Reset Filters</button>
      </div>
      <Characters characters={filteredChars} species={data.species} homeWorlds={data.homeWorlds} />
    </>
  );
}

export default Listings;