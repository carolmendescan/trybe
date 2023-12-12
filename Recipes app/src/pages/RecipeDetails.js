/* eslint-disable react/jsx-max-depth */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Recommendations from '../components/Recommendations';
import ShareButton from '../components/ShareButton';
import StartButton from '../components/StartButton';
import { useSearch } from '../context/SearchbarContext';
import FavoriteBtn from '../components/FavoriteBtn';

export default function FavoriteRecipes() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();
  const [recipeStarted, setRecipeStarted] = useState(false);
  const type = atualPath === `/meals/${id}` ? 'Meal' : 'Drink';
  const [inProgressRecipes, setInProgressRecipes] = useState(
    JSON.parse(localStorage.getItem('inProgressRecipes')) || {},
  );

  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const mealsData = await response.json();
      setData(mealsData.meals);
    }
    if (atualPath?.includes('/drinks')) {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const drinkData = await response.json();
      setData(drinkData.drinks);
    }
  }, [atualPath]);

  useEffect(() => {
    async function getList() {
      const results = await updateData();
      return results;
    }
    getList();
  }, [updateData]);

  const onRecipeItemChange = (index) => {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      [type]: {
        ...inProgressRecipes[type],
        [id]: inProgressRecipes[type][id].includes(index)
          ? inProgressRecipes[type][id].filter((e) => e !== index)
          : [...inProgressRecipes[type][id], index],
      },
    }));

    setInProgressRecipes(JSON.parse(localStorage.getItem('inProgressRecipes')));
  };

  const objectsData = data[0] && Object.keys(data[0]);
  const ingredients = objectsData?.filter((e) => e.includes('strIngredient'));
  const measures = objectsData?.filter((e) => e.includes('strMeasure'));
  const linkYoutube = data[0] && data[0].strYoutube;
  const endpoint = linkYoutube?.split('?v=');
  console.log(endpoint);
  return (
    <div
      className="
      max-w-screen
      bg-slate-100
      flex
      flex-col
      items-center
      min-h-screen
      "
    >
      {data?.map((recipe) => (
        <div
          key={ id }
          className="bg-slate-100 flex flex-col items-center w-screen max-w-3xl"
        >
          <div className="w-full flex flex-col items-center">
            <div
              className="
            overflow-hidden
            md:h-96
            w-full
            rounded-b-xl
            h-60
            max-w-3xl"
            >
              <img
                className="object-cover w-full  h-full"
                data-testid="recipe-photo"
                src={ recipe[`str${type}Thumb`] }
                alt={ recipe[`str${type}`] }
              />
            </div>
            <div className="md:w-full w-11/12 max-w-3xl">
              <div className="bg-white p-2 max-w-3xl rounded-md -translate-y-16">
                <div className="flex w-[80%] gap-20 items-center">
                  <p
                    data-testid="recipe-title"
                    className="text-2xl font-semibold"
                  >
                    {recipe[`str${type}`]}
                  </p>
                  <StartButton
                    id={ id }
                    type={ type }
                    startState={ [recipeStarted, setRecipeStarted] }
                  />
                  <ShareButton
                    className="absolute -top-40 md:top-2 right-5"
                  />
                  <FavoriteBtn
                    className="absolute -top-40 right-14 md:top-2 "
                    recipe={ recipe }
                  />
                  <Link
                    className="
                    absolute
                    left-0
                    md:left-2
                    h-6
                    w-6
                    flex
                    justify-center
                    rounded-md
                    -top-40
                    md:-top-[315px]
                    bg-gray-200"
                    to={ `/${atualPath?.split('/')[1]}` }
                  >
                    X
                  </Link>
                </div>
                {
                  recipe.strAlcoholic && (
                    <p data-testid="recipe-category">
                      {`${recipe.strCategory} ${recipe.strAlcoholic}`}
                    </p>
                  )
                }

                <h3 className="text-lg font-medium">Ingredients:</h3>
                <div className="grid grid-auto-fit">
                  {ingredients.map((e, index) => {
                    if (recipe[e] && recipe[e].length > 0) {
                      return (
                        <div key={ e + index } className="flex gap-2">
                          {
                            !recipeStarted ? (
                              <p className="text-blue-300">
                                |
                              </p>
                            ) : (
                              <input
                                checked={
                                  inProgressRecipes[type]?.[id]?.includes(index)
                                }
                                onChange={ () => onRecipeItemChange(index) }
                                value={ index }
                                type="checkbox"
                              />
                            )
                          }
                          <p
                            key={ e }
                            data-testid={ `${index}-ingredient-name-and-measure` }
                          >
                            {`${recipe[measures[index]] || ''} ${recipe[e]}`}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
            <h3 className="md:w-full text-lg font-medium w-11/12 max-w-3xl">
              Instructions:
            </h3>
            <p
              data-testid="instructions"
              className="md:w-full w-11/12 max-w-3xl"
            >
              {recipe.strInstructions}
            </p>

          </div>
          <iframe
            data-testid="video"
            src={
              data[0].strYoutube
                  && `https://www.youtube.com/embed/${endpoint[1]}`
            }
            className="w-full max-w-3xl h-96 pt-20"
            title="Video"
          />
        </div>
      ))}
      <div className="w-full max-w-3xl">
        <p className="text-lg md:w-full w-11/12 pt-10 font-medium m-auto max-w-3xl">
          Recommendations:
        </p>
        <Recommendations />
      </div>
    </div>
  );
}
