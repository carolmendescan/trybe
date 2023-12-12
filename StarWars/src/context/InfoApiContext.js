import React, { useEffect, useState, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';
import useFetch from '../hooks/useFetch';

export const InfoApiContext = createContext();

export function InfoApiProvider({ children }) {
  const { isLoading, errors, makeFetch } = useFetch();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getInfos = async (url) => {
      setData(await makeFetch(url));
    };
    getInfos('https://swapi.dev/api/planets');
  }, []);

  const values = useMemo(() => ({
    isLoading, errors, data, setData,
  }), [data, isLoading, errors]);

  return (
    <InfoApiContext.Provider value={ values }>
      { children }
    </InfoApiContext.Provider>
  );
}

InfoApiProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
