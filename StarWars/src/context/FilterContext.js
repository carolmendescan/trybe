import React, { useContext, useEffect, createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { InfoApiContext } from './InfoApiContext';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const { data } = useContext(InfoApiContext);
  const [inputFilter, setInputFilter] = useState('');
  const [newArray, setNewArray] = useState('');
  const [dropColumn, setDropColumn] = useState('population');
  const [dropOperator, setDropOperator] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [filters, setFilters] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [sortOptions, setSortOptions] = useState(
    { order: { column: 'population', sort: 'ASC' } },
  );
  const [sortBtn, setSortBtn] = useState('');

  function filterByCol(array) {
    let threeFilters = array;
    filters.forEach((filtro) => {
      switch (filtro.dropOperator) {
      case 'maior que':
        threeFilters = threeFilters
          .filter((planet) => Number(planet[filtro.dropColumn])
          > Number((filtro.number)));
        break;
      case 'menor que':
        threeFilters = threeFilters
          .filter((planet) => Number(planet[filtro.dropColumn])
            < Number((filtro.number)));
        break;
      default:
        threeFilters = threeFilters
          .filter((planet) => Number(planet[filtro.dropColumn])
              === Number((filtro.number)));
        break;
      }
    });
    return threeFilters;
  }

  function sortData(arrayFiltered) {
    const negativeOne = -1;
    if (!sortBtn) return arrayFiltered;
    if (sortBtn.order.sort === 'ASC') {
      arrayFiltered.sort((a, b) => {
        if (b[sortBtn.order.column] === 'unknown') return negativeOne;
        return a[sortBtn.order.column] - b[sortBtn.order.column];
      });
    }
    if (sortBtn.order.sort === 'DESC') {
      arrayFiltered.sort((a, b) => {
        if (b[sortBtn.order.column] === 'unknown') return negativeOne;
        return b[sortBtn.order.column] - a[sortBtn.order.column];
      });
    }
    return arrayFiltered;
  }

  useEffect(() => {
    const filterByName = data
      .filter((planeta) => planeta.name.includes(inputFilter));
    const filterByColumn = filterByCol(filterByName);
    const sortedData = sortData(filterByColumn);
    setNewArray(sortedData);
  }, [inputFilter, data, filters, sortBtn]);

  function handleThreeFilters(e) {
    e.preventDefault();
    setFilters([...filters, { dropOperator, dropColumn, number }]);
    setClicked(!clicked);
  }

  function deleteFilter({ target: { value } }) {
    const deleted = filters.filter((filtro) => filtro.dropColumn !== value);
    setFilters(deleted);
  }

  const values = {
    newArray,
    setNewArray,
    inputFilter,
    setInputFilter,
    dropColumn,
    setDropColumn,
    dropOperator,
    setDropOperator,
    number,
    setNumber,
    handleThreeFilters,
    filters,
    setFilters,
    setClicked,
    clicked,
    deleteFilter,
    sortOptions,
    setSortOptions,
    setSortBtn,
  };

  return (
    <FilterContext.Provider value={ values }>
      { children }
    </FilterContext.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;
