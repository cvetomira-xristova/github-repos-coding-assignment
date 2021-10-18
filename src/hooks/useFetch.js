import React, { useState, useEffect } from 'react';

export default function useFetch(apiFunction, apiFunctionArguments) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await apiFunction([...apiFunctionArguments]);
        setData(response.data);
      } catch (error) {
        setHasError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [apiFunction, apiFunctionArguments]);

  return { data, hasError, isLoading };
}
