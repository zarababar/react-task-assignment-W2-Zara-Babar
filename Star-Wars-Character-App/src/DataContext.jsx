import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [characters, setCharacters] = useState([]);
  const [homeWorlds, setHomeWorlds] = useState([]);
  const [species, setSpecies] = useState([]);
  const [films, setFilms] = useState([]);
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    try {
      const charResponse = await axios.get('https://swapi.dev/api/people/');
      const charactersData = charResponse.data.results;
      setCharacters(charactersData);

      const homeWorldUrls = charactersData.map(character => character.homeworld);
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

      setHomeWorlds(homeWorldsData);
      setSpecies(speciesData);
      setFilms(filmsData);
    }
    catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    characters,
    homeWorlds,
    species,
    films,
    search,
    setSearch
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
