import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const makeFetch = async (url) => {
    try {
      setIsLoading(true);

      const response = await fetch(url);
      const json = await response.json();
      if (!json.results) {
        throw new Error(`A resposta da ${url} veio com erro`);
      }
      return json.results;
    } catch (error) {
      setErrors(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    makeFetch, isLoading, errors,
  };
}

export default useFetch;
