import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const aboutTitle = screen.getByRole('heading', { level: 2 });
    expect(aboutTitle).toHaveTextContent(/About Pokédex/i);
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragrafosPokedex = screen.getAllByText(/Pokémon/i);
    expect(paragrafosPokedex).toHaveLength(2);
  });
  test('Teste se a página contém a imagem de uma Pokédex', () => {
    render(<About />);
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
