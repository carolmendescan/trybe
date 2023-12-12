/* eslint-disable import/no-unresolved */
/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSearch } from '../context/SearchbarContext';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Recommendations() {
  const [data, setData] = useState([]);
  const { atualPath } = useSearch();
  const { id } = useParams();
  const type = atualPath === `/meals/${id}` ? 'Drink' : 'Meal';

  const updateData = useCallback(async () => {
    if (atualPath?.includes('/meals')) {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const mealsData = await response.json();
      setData(mealsData.drinks);
    }
    if (atualPath?.includes('/drinks')) {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const drinkData = await response.json();
      setData(drinkData.meals);
    }
  }, [atualPath]);

  const maxRecommendations = 6;
  const resultsData = data?.slice(0, maxRecommendations);

  useEffect(() => {
    async function getList() {
      const results = await updateData();
      return results;
    }
    getList();
  }, [updateData]);

  return (
    <div className="w-11/12 md:w-full m-auto">
      <Swiper
        slidesPerView="auto"
        spaceBetween={ 30 }
      >
        {
          resultsData?.map((meal, index) => (
            <SwiperSlide className="w-max" key={ index }>
              <Link to={ `/${type.toLowerCase()}s/${meal[`id${type}`]}` }>
                <div data-testid={ `${index}-recommendation-card` }>
                  <img
                    width="150px"
                    height="100px"
                    src={ meal[`str${type}Thumb`] }
                    alt={ meal[`str${type}`] }
                  />
                  <div data-testid={ `${index}-recommendation-title` }>
                    {meal[`str${type}`]}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  );
}
