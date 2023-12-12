import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);
const pokemonRoute = '/pokemon/25';

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App name="Pikachu" />);
    const moreDetailsLink = screen.getByRole('link', { name: /More details/i });

    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(pokemonRoute);

    expect(screen.getByText(/Pikachu Details/i)).toBeVisible();
    expect(moreDetailsLink).not.toBeInTheDocument();

    const summaryHeading = screen.getByRole('heading', { name: /Summary/i });
    expect(summaryHeading).toBeInTheDocument();

    const paragraph = screen.getByText(/make them tender enough to eat/i);
    expect(paragraph).toBeVisible();
  });

  test('Testa se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App name="Pikachu" />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(pokemonRoute);

    expect(screen.getByText(/Game Locations of Pikachu/i)).toBeVisible();

    const imgMap = screen.getAllByRole('img', { name: /Pikachu location/i });
    expect(imgMap[0]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgMap[1]).toHaveProperty('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(imgMap[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(imgMap[1]).toHaveAttribute('alt', 'Pikachu location');

    expect(screen.getByText(/Kanto Power Plant/i)).toBeInTheDocument();
    expect(screen.getByText(/Kanto Viridian Forest/i)).toBeInTheDocument();
  });

  test('Testa se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App name="Pikachu" />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe(pokemonRoute);

    const favoritado = screen.getByRole('checkbox');
    expect(favoritado).toBeInTheDocument();

    userEvent.click(favoritado);
    const star = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(star).toBeInTheDocument();
    userEvent.click(favoritado);
    expect(star).not.toBeInTheDocument();

    expect(screen.getByRole('checkbox', { name: /Pokémon favoritado?/i }));
  });
});
