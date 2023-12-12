import React from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
  const localUser = JSON.parse(localStorage.getItem('user')) || { email: '' };
  return (
    <div
      data-testid="profile-email"
      className="
      z-50
      absolute
      md:right-0
      rounded-lg
      shadow-lg
      flex
      flex-col
      gap-2
      bg-white
      p-2
      top-12"
    >
      <h2 className="pt-2">{localUser.email}</h2>
      <hr />

      <Link to="/favorite-recipes">
        <p>Favorite Recipes</p>
      </Link>
      <hr />

      <Link onClick={ () => localStorage.clear() } to="/">
        Logout
      </Link>

    </div>
  );
}
