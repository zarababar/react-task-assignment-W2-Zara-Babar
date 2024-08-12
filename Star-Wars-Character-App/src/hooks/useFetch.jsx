import { useState, useCallback, useEffect } from "react";
import axios from "axios";

const useFetch = (apiURL) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiURL);
      setFetchedData(response.data);
    } catch (error) {
      // Improved error handling
      setError(error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  }, [apiURL]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { fetchedData, isLoading, error };
};

export default useFetch;
