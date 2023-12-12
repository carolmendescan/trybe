import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../pages';

describe('Teste o componente <NotFound.js />', () => {
  test('Testa se a página contém um heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const notFoundTitle = screen.getByRole('heading', { level: 2 });
    expect(notFoundTitle).toHaveTextContent(/Page requested not found/i);

    // const notFoundTitle = screen.getByRole('heading', { level: 2, name: 'Page requested not found' });
    // expect(notFoundTitle).toBeInTheDocument();
  });
  test('Testa se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const imageNotFound = screen.getByRole('img');
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
