import { useState, useCallback, useEffect } from "react";
import axios from "axios";
const useFetch = (apiURL, currentPage) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [fetchedData, setFetchedData] = useState(null);

    const fetchData = useCallback(async (page = currentPage) => {

        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${apiURL}?page=${page}`);
            setFetchedData(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    })
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    return { fetchedData, isLoading, error };
};
export default useFetch;
