import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (apiURL) => {
    const [data, setData] = useState({
        characters: [],
        homeWorlds: [],
        species: [],
        films: []
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async (page) => {
        try {
            const url = `${apiURL}?page=${page}`;
            const response = await axios.get(url);
            const newCharacters = response.data.results;
            const totalItems = response.data.count;
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
                homeWorlds: prevData.homeWorlds.concat(homeWorldsData),
                species: prevData.species.concat(speciesData),
                films: prevData.films.concat(filmsData)
            }));
            setTotalPages(totalPageCount);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);


    return { data, currentPage, totalPages, setCurrentPage };
};
export default useFetch;