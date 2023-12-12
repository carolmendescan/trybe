import { useState } from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteBtn({ recipe, click = null, ...rest }) {
  const {
    id,
    type,
    strArea: nationality,
    strCategory: category,
    strAlcoholic: alcoholicOrNot,
    [`str${type}`]: name,
    [`str${type}Thumb`]: image } = recipe;
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
  const [isFavorite, setIsFavorite] = useState(
    favoriteRecipes.find((e) => e.id === id),
  );

  const handleFavorite = () => {
    const newFavoriteRecipes = isFavorite
      ? favoriteRecipes.filter((e) => e.id !== id) : [
        ...favoriteRecipes,
        {
          id,
          type,
          nationality,
          category,
          alcoholicOrNot,
          name,
          image,
        },
      ];
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(newFavoriteRecipes),
    );
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      { ...rest }
      onClick={ () => {
        handleFavorite();
        if (click) click();
      } }
    >
      <img
        className="w-7 h-7"
        alt="heart"
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
  }).isRequired,
  click: PropTypes.func,
};

export default FavoriteBtn;
