import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import '../Footer.css';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { useSearch } from '../context/SearchbarContext';

export default function Footer() {
  const { atualPath } = useSearch();
  return (
    <div
      data-testid="footer"
      className="
      flex
      justify-between
      w-full
      py-2
      shadow-md
      px-10
      bg-white
      fixed
      bottom-0
      md:hidden
      "
    >
      <Link
        className={ `${atualPath === '/drinks' && 'bg-orange-200'} p-2 rounded-lg` }
        to="/drinks"
      >
        <img
          width={ 32 }
          height={ 32 }
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="Icone de bebidas"
        />
      </Link>
      <Link
        className={ `${atualPath === '/meals' && 'bg-orange-200'} p-2 rounded-lg` }
        to="/meals"
      >
        <img
          width={ 32 }
          height={ 32 }
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          alt="Icone de carnes"
        />
      </Link>
    </div>
  );
}
