import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from '../pages/Profile';
import SeachIcon from '../images/searchIcon.svg';
import ProfileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import { useSearch } from '../context/SearchbarContext';
import { useWindowSize } from '../hooks/useWindowSize';

function Header() {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [search, setSearch] = useState(false);
  const { atualPath } = useSearch();
  const { width } = useWindowSize();

  const headerInfos = {
    '/meals': {
      searchIcon: true,
      type: 'meal',
      title: 'Meals',
    },
    '/drinks': {
      searchIcon: true,
      type: 'drink',
      title: 'Drinks',
    },
    '/profile': {
      searchIcon: false,
      title: 'Profile',
    },
    '/done-recipes': {
      searchIcon: false,
      title: 'Done Recipes',
    },
    '/favorite-recipes': {
      searchIcon: false,
      title: 'Favorite Recipes',
    },
  };

  const atualPathInfos = headerInfos[atualPath];

  useEffect(() => {
    if (atualPathInfos) {
      const md = 768;
      if (atualPathInfos.searchIcon && width > md) {
        setSearch(true);
      }
    }
  }, [width]);

  if (!atualPathInfos) return null;

  return (
    <div className="fixed z-20 w-full bg-white">
      <div className="relative  m-auto max-w-5xl">
        <header className="h-14 flex items-center justify-between px-2 py-2">
          <button
            to="/profile"
            className=" md:order-2 relative"
            onClick={
              () => setProfileDropdown(!profileDropdown)
            }
          >
            <img
              src={ ProfileIcon }
              alt="profile icon"
              data-testid="profile-top-btn"
            />
            {
              profileDropdown && (
                <Profile />
              )
            }
          </button>

          <Link className="h-14" to="/meals">
            <img
              alt="logo"
              src="https://media.istockphoto.com/id/905914578/vector/word-cook-with-smiley-instead-of-letter-o.jpg?s=612x612&w=0&k=20&c=tz9WrjHlKkjsB7O6eEXh7phm75odg1I4z0PLPuBanak="
              className="md:order-1 h-full"
            />
          </Link>

          <div className="pl-80 hidden md:flex gap-5">
            <Link className="font-bold" to="/meals">
              Meals
            </Link>
            <Link className="font-bold" to="/drinks">
              Drinks
            </Link>
          </div>

          {atualPathInfos.searchIcon && (
            <button className="md:hidden" onClick={ () => setSearch(!search) }>
              <img
                alt="search icon"
                src={ SeachIcon }
                data-testid="search-top-btn"
              />
            </button>
          )}
        </header>
        {search && (
          <SearchBar type={ atualPathInfos.type } />
        )}
      </div>
    </div>
  );
}

export default Header;
