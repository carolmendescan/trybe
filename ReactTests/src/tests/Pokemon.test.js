import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Testa o componente <Pokemon.js />', () => {
  test('Testa se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App name="Pikachu" type="Electric" value={ 6.0 } measurementUnit="Kg" image="https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png" />);
    expect(screen.getByText('Pikachu')).toBeVisible();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByText(/6.0/i)).toBeVisible();
    expect(screen.getByText(/Kg/i)).toBeVisible();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(screen.getByRole('img', { name: /Pikachu sprite/i })).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Testa se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history } = renderWithRouter(<App id={ 25 } />);
    const moreDetailsLink = screen.getByRole('link', { name: 'More details' });

    expect(moreDetailsLink).toBeInTheDocument();

    userEvent.click(moreDetailsLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);

    const favoritado = screen.getByRole('checkbox');
    expect(favoritado).toBeInTheDocument();

    userEvent.click(favoritado);

    history.push('/');

    const star = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
