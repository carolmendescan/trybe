import React from 'react';
import { screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

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
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: '{measurementUnit: "kg", value: "8.5"}',
    image: 'https://archives.bulbagarden.net/media/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: '[{…}, {…}, {…}, {…}]',
    summary: 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.',
  },
  {
    id: 10,
    name: 'Caterpie',
    type: 'Bug',
    averageWeight: {
      value: '2.9',
      measurementUnit: 'kg',
    },
    image: 'https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Caterpie_(Pok%C3%A9mon)',
    foundAt: '[{…}, {…}, {…}, {…}]',
    summary: 'For protection, it releases a horrible stench from the antennae on its head to drive away enemies.',
  },
];

afterEach(cleanup);

describe('Testa o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const encounteredTitle = screen.getByRole('heading', { level: 2 });
    expect(encounteredTitle).toHaveTextContent(/Encountered Pokémon/i);
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App isPokemonFavoriteById={ pokemon } />);
    const btnNextPokemon = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(btnNextPokemon).toBeInTheDocument();
    const pikachuPokemon = screen.getByText('Pikachu');
    expect(pikachuPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);
    const pokemonCharmander = screen.getByText(/Charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', async () => {
    renderWithRouter(<App isPokemonFavoriteById={ pokemon } />);
    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(btnNextPokemon);
    userEvent.click(btnNextPokemon);
    const pokedexList = await screen.findAllByText(/Average weight/i);
    expect(pokedexList).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByRole('button', { name: 'All' });
    const electric = screen.getByRole('button', { name: 'Electric' });
    const fire = screen.getByRole('button', { name: 'Fire' });
    const bug = screen.getByRole('button', { name: 'Bug' });
    const poison = screen.getByRole('button', { name: 'Poison' });
    const psychic = screen.getByRole('button', { name: 'Psychic' });
    const normal = screen.getByRole('button', { name: 'Normal' });
    const dragon = screen.getByRole('button', { name: 'Dragon' });

    const filtroBtn = screen.getAllByTestId('pokemon-type-button');
    expect(filtroBtn).toHaveLength(7);

    expect(all).toBeInTheDocument();
    expect(electric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
    expect(normal).toBeInTheDocument();
    expect(dragon).toBeInTheDocument();

    userEvent.click(all);
    expect(screen.getByText('Pikachu')).toBeVisible();
    userEvent.click(electric);
    expect(screen.getByText('Pikachu')).toBeVisible();
    userEvent.click(fire);
    expect(screen.getByText('Charmander')).toBeVisible();
    userEvent.click(bug);
    expect(screen.getByText('Caterpie')).toBeVisible();
    userEvent.click(poison);
    expect(screen.getByText('Ekans')).toBeVisible();
    userEvent.click(psychic);
    expect(screen.getByText('Alakazam')).toBeVisible();
    userEvent.click(normal);
    expect(screen.getByText('Snorlax')).toBeVisible();
    userEvent.click(dragon);
    expect(screen.getByText('Dragonair')).toBeVisible();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btnNextPokemon = screen.getByRole('button', { name: 'Próximo Pokémon' });
    const all = screen.getByRole('button', { name: 'All' });
    const bug = screen.getByRole('button', { name: 'Bug' });

    userEvent.click(all);
    expect(screen.getByText('Pikachu')).toBeVisible();
    userEvent.click(btnNextPokemon);
    expect(screen.getByText('Charmander')).toBeVisible();
    userEvent.click(bug);
    expect(screen.getByText('Caterpie')).toBeVisible();
    expect(btnNextPokemon).toBeDisabled();
    userEvent.click(all);
    expect(screen.getByText('Pikachu')).toBeVisible();
    expect(btnNextPokemon).not.toBeDisabled();
  });
});
