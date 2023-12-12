import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('testando o componente App.js', () => {
  test('Testa se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  test('Testa se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Testa se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonLink = screen.getByRole('link', { name: 'Favorite Pokémon' });

    expect(favoritePokemonLink).toBeInTheDocument();

    userEvent.click(favoritePokemonLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Testa se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', async () => {
    const { history } = renderWithRouter(<App />);

    const route = '/rotainexistente';
    history.push(route);

    // act(() => {
    //   history.push(route);
    // });

    const pageNotFound = await screen.findByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });
});
