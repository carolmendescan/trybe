import React, { useContext, useEffect } from 'react';
import { FilterContext } from '../context/FilterContext';

export default function Form() {
  const { inputFilter,
    setInputFilter,
    dropColumn,
    setDropColumn,
    dropOperator,
    setDropOperator,
    number,
    setNumber,
    handleThreeFilters,
    setFilters,
    filters,
    // setClicked,
    clicked,
    deleteFilter,
    sortOptions,
    setSortOptions,
    setSortBtn } = useContext(FilterContext);

  const optionsCol = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  const optionsFilter = optionsCol
    .filter((option) => !filters
      .some((filter) => filter.dropColumn.includes(option)));
  // if (clicked) {
  //   setDropColumn(optionsFilter[0]);
  //   setClicked(false);
  // }
  // ================================================
  // Pode fazer com o if() acima, mas usei o useEffect() abaixo:
  // ================================================

  useEffect(() => {
    setDropColumn(optionsFilter[0]);
  }, [clicked]);

  return (
    <form>
      <input
        className="input-filtro"
        data-testid="name-filter"
        type="text"
        value={ inputFilter }
        name="inputFilter"
        onChange={ (e) => setInputFilter(e.target.value) }
        placeholder="🔍"
      />

      <div className="formulario">
        <fieldset>
          <label htmlFor="coluna">Coluna</label>
          <select
            id="coluna"
            name="coluna"
            onChange={ (e) => setDropColumn(e.target.value) }
            value={ dropColumn }
            data-testid="column-filter"
          >
            {optionsFilter.map((optionFilter) => (
              <option
                value={ optionFilter }
                key={ optionFilter }
              >
                {optionFilter}
              </option>
            ))}

          </select>
        </fieldset>

        <fieldset>
          <label htmlFor="operador">Operador</label>
          <select
            data-testid="comparison-filter"
            id="operador"
            name="operador"
            onChange={ (e) => setDropOperator(e.target.value) }
            value={ dropOperator }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </fieldset>

        <fieldset>
          <input
            data-testid="value-filter"
            onChange={ (e) => setNumber(e.target.value) }
            value={ number }
            type="number"
          />
        </fieldset>

        <button
          data-testid="button-filter"
          onClick={ handleThreeFilters }
          disabled={ optionsFilter.length === 0 }
        >
          FILTRAR
        </button>

        <fieldset>
          <label htmlFor="ordenar">Ordenar</label>
          <select
            id="ordenar"
            name="ordenar"
            data-testid="column-sort"
            onChange={ (e) => setSortOptions(
              { order: { ...sortOptions.order, column: e.target.value } },
            ) }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </fieldset>

        <div>
          <input
            type="radio"
            id="asc"
            name="AscDesc"
            value="ASC"
            data-testid="column-sort-input-asc"
            onChange={ (e) => setSortOptions(
              { order: { ...sortOptions.order, sort: e.target.value } },
            ) }
          />
          <label htmlFor="asc">Ascendente</label>
          <br />
          <input
            type="radio"
            id="desc"
            name="AscDesc"
            value="DESC"
            data-testid="column-sort-input-desc"
            onChange={ (e) => setSortOptions(
              { order: { ...sortOptions.order, sort: e.target.value } },
            ) }
          />
          <label htmlFor="desc">Descendente</label>
        </div>

        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ () => setSortBtn(sortOptions) }
        >
          ORDENAR
        </button>
      </div>

      <div className="yellow">
        {filters && filters
          .map((filtro) => (
            <div key={ filtro.dropColumn } className="filterdiv" data-testid="filter">
              <div>{filtro.dropColumn}</div>
              <div>{filtro.dropOperator}</div>
              <div>{filtro.number}</div>
              <button
                type="button"
                value={ filtro.dropColumn }
                onClick={ deleteFilter }
              >
                Excluir

              </button>
            </div>
          ))}

        {filters.length > 0 && (
          <button
            type="button"
            onClick={ () => { setFilters([]); setDropColumn('population'); } }
            data-testid="button-remove-filters"
            className="remover"
          >
            REMOVER FILTROS
          </button>
        )}
      </div>

    </form>
  );
}
