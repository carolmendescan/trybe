/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from '../components/Footer';
import { useSearch } from '../context/SearchbarContext';

export default function Meals() {
  const {
    data, atualPath, filters, setData, setResetTrigger } = useSearch();
  const [atualFilter, setAtualFilter] = useState('All');
  const maxFilters = 5;
  const filtersToRender = filters?.slice(0, maxFilters);
  const type = atualPath === '/meals' ? 'Meal' : 'Drink';

  const handleFilter = async ({ target }) => {
    const { name } = target;

    const category = name === atualFilter ? 'All' : name;
    setAtualFilter(category);
    if (category === 'All') return setResetTrigger((t) => !t);

    const endpoint = atualPath === '/meals' ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}` : `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`;
    const response = await fetch(endpoint);
    const respData = await response.json();
    setData(Object.values(respData)[0]);
  };

  return (

    <div className="bg-slate-100 min-h-screen">
      <div className="pt-20 flex">
        <Swiper
          slidesPerView="auto"
          spaceBetween={ 30 }
          pagination={ {
            clickable: true,
          } }
        >
          {filtersToRender.length > 0
          && (
            <SwiperSlide
              className={ ` 
              w-max
              px-3
              font-semibold
              py-1
              rounded-md
              ${atualFilter === 'All' && 'bg-orange-200'}` }
            >
              <button
                name="All"
                onClick={ handleFilter }
                data-testid="All-category-filter"
                type="button"
              >
                All
              </button>
            </SwiperSlide>
          )}
          { filtersToRender?.map((filter) => (
            <SwiperSlide
              className={ `
            w-max
            px-3
            font-semibold
            py-1
            rounded-md
            ${filter === atualFilter && 'bg-orange-200'}
            ` }
              key={ filter }
            >
              <button
                name={ filter }
                onClick={ handleFilter }
                data-testid={ `${filter}-category-filter` }
                type="button"
              >
                {filter}
              </button>
            </SwiperSlide>
          )) }
        </Swiper>
      </div>
      <div
        className="
        m-auto
        grid gap-4 grid-auto-fit
        place-items-center
        max-w-5xl
        md:justify-start
        pt-14
        "
      >
        {
          data?.map((meal, indexr) => (
            <section
              className="w-11/12 rounded-lg max-w-xs bg-white"
              key={ indexr }
            >
              <Link
                className="w-full h-full"
                to={ `${atualPath}/${meal[`id${type}`]}` }
                data-testid={ `${indexr}-recipe-card` }
              >
                <div className="overflow-hidden rounded-t-lg h-[120px]">
                  <img
                    className="w-full -translate-y-10"
                    data-testid={ `${indexr}-card-img` }
                    src={ meal[`str${type}Thumb`] }
                    alt={ meal[`str${type}`] }
                  />
                </div>
                <div className="h-16 pt-1 pl-2">
                  <p
                    className="font-bold text-lg truncate w-full"
                    data-testid={ `${indexr}-card-name` }
                  >
                    {meal[`str${type}`]}
                  </p>
                </div>
              </Link>
            </section>
          ))
        }
      </div>
      <Footer />
    </div>
  );
}
