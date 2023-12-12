import PropTypes from 'prop-types';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { handleSearch } from '../services/handleSearch';
import { useSearch } from '../context/SearchbarContext';
import SeachIcon from '../images/searchIcon.svg';

function SearchBar({ type }) {
  const { setData } = useSearch();
  const history = useHistory();
  const [searchValues, setSearchValues] = useState({
    searchInput: '',
    searchRadio: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setSearchValues({
      ...searchValues,
      [name]: value,
    });
  };

  return (
    <div
      className="
      flex
      gap-2
      flex-col
      justify-center
      items-center
      md:w-1/2
      md:absolute
      md:top-[9px]
      md:right-[40%]"
    >
      <div
        className="relative w-11/12 max-w-xs"
      >
        <select
          className="
          hidden
          md:block
          absolute focus:outline-0 w-28 left-[1px] top-[0.5px] z-10 h-[93%] rounded-l-md"
          name="searchRadio"
          value={ searchValues.searchRadio }
          onChange={ handleChange }
        >
          <option value="ingredient">Ingrediente</option>
          <option value="name">Nome</option>
          <option value="first-letter">Primeira Letra</option>
        </select>
        <p
          className="text-gray-300
        hidden md:block absolute z-10 text-lg left-[113px] top-[5px]"
        >
          |

        </p>
        <input
          autoComplete="off"
          placeholder="Buscar"
          type="text"
          data-testid="search-input"
          name="searchInput"
          className="
          md:pl-[120px]
          relative
          h-10
          focus:outline-0
          border
          shadow-sm
          border-gray-200
          w-full
          rounded-md
          pl-2"
          onChange={ handleChange }
        />
        <button
          onClick={ async () => setData(
            await handleSearch(searchValues, history, type, global),
          ) }
          type="button"
          className="
          bg-yellow-400
          right-0
          shadow-sm
          rounded-r-md
          w-10
          h-[98%]
          z-10
          absolute
          "
          data-testid="exec-search-btn"
        >
          <img className="m-auto" src={ SeachIcon } alt="search" />
        </button>
      </div>
      <div className="flex gap-3 md:hidden pb-2">
        <label className="flex gap-1" htmlFor="ingredient-search-radio">
          <input
            type="radio"
            name="searchRadio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            onChange={ handleChange }
          />
          Ingrediente
        </label>

        <label className="flex gap-1" htmlFor="name-search-radio">
          <input
            type="radio"
            name="searchRadio"
            data-testid="name-search-radio"
            value="name"
            onChange={ handleChange }
          />
          Nome
        </label>

        <label className="flex gap-1" htmlFor="first-letter-search-radio">
          <input
            type="radio"
            name="searchRadio"
            data-testid="first-letter-search-radio"
            value="first-letter"
            onChange={ handleChange }
          />
          Primeira letra
        </label>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
