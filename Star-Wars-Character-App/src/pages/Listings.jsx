import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import { getAuthToken, getUsername, isAuthenticated } from '../utils/authutils'; // Update path as necessary

import Header from '../components/Header';
import Search from '../components/Search';
import Filters from '../components/Filters';
import Characters from '../components/Characters';
import Pagination from '../components/Pagination';
import Loader from '../components/loader';
import { getUniqueOptions } from '../utils/utils';

const Listings = () => {
  const apiBaseURL = import.meta.env.VITE_APP_SWAPI_API_URL;
  const username = getUsername();

  const [data, setData] = useState({
    characters: [],
    homeWorlds: [],
    species: [],
    films: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    homeWorld: '',
    species: '',
    film: ''
  });

  const apiURL = `${apiBaseURL}${currentPage}`;
  const { fetchedData, isLoading, error } = useFetch(apiURL);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const fetchDataAndUpdateState = async () => {
      if (!fetchedData) return;
      try {
        const newCharacters = fetchedData.results;
        const totalItems = fetchedData.count;
        const totalPageCount = Math.ceil(totalItems / 10);

        const homeWorldUrls = newCharacters.map(character => character.homeworld);
        const speciesUrls = newCharacters.flatMap(character => character.species);
        const filmUrls = newCharacters.flatMap(character => character.films);

        const [homeWorldResponses, speciesResponses, filmResponses] = await Promise.all([
          Promise.all(homeWorldUrls.map(url => axios.get(url))),
          Promise.all(speciesUrls.map(url => axios.get(url))),
          Promise.all(filmUrls.map(url => axios.get(url)))
        ]);

        const homeWorldsData = homeWorldResponses.map(response => response.data);
        const speciesData = speciesResponses.map(response => response.data);
        const filmsData = filmResponses.map(response => response.data);

        setData(prevData => ({
          characters: newCharacters,
          homeWorlds: homeWorldsData,
          species: speciesData,
          films: filmsData
        }));
        setTotalPages(totalPageCount);
      } catch (error) {
        console.error("Error fetching additional data", error);
      }
    };

    fetchDataAndUpdateState();
  }, [currentPage, fetchedData]);
  
  if (!isAuthenticated()) {
    return <Navigate to="/" />; // Redirect to Login if not authenticated
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearch = useCallback((query) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearch(query);
    }, 1000);
  }, []);

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

  const uniqueHomeWorlds = useMemo(() => getUniqueOptions(data.homeWorlds, 'url'), [data.homeWorlds]);
  const uniqueSpecies = useMemo(() => getUniqueOptions(data.species, 'url'), [data.species]);
  const uniqueFilms = useMemo(() => getUniqueOptions(data.films, 'url'), [data.films]);

  return (
    <>
      <Header uname={username} />
      <div className="filter-container">
        <Search onSearch={handleSearch} />
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
          uniqueHomeWorlds={uniqueHomeWorlds}
          uniqueSpecies={uniqueSpecies}
          uniqueFilms={uniqueFilms}
        />
      </div>
      
      {isLoading || isUpdating ? (
        <Loader />
      ) : error ? (
        <p>Error fetching data</p>
      ) : (
        <>
          <Characters
            characters={filteredChars}
            species={data.species}
            homeWorlds={data.homeWorlds}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default Listings;
