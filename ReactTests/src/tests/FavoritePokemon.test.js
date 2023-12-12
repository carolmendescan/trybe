import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import { FavoritePokemon } from '../pages';

const pokemon = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      '{location: "Kanto Viridian Forest", map: "https://a…}',
      '{location: "Kanto Power Plant", map: "https://archi…}',
    ],
    summary: 'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  },
];

afterEach(cleanup);

describe('Testa o componente <FavoritePokemon.js />', () => {
  test('Testa se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemon } />);
    const pokemonsList = screen.getByText(/Electric/i);
    expect(pokemonsList).toBeVisible();
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    userEvent.click(favoritePokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    expect(screen.getByText(/No favorite Pokémon found/i)).toBeInTheDocument();

    // renderWithRouter(<FavoritePokemon />);
    // const pokemonsList = screen.getByText(/No favorite Pokémon found/i);
    // expect(pokemonsList).toBeVisible();
  });

  test('Testa se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemon } />);
    const pokemonsList = screen.getByText(/Electric/i);
    expect(pokemonsList).toBeVisible();
  });
});
