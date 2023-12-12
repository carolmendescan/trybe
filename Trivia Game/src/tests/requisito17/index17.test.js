import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import App from "../../App";
import userEvent from '@testing-library/user-event';

describe('17 - Desenvolva testes para atingir 90% de cobertura da tela de Feedbacks', () => {
  it('testa se está sendo renderizado corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, {player: {name: 'Carol', assertions: 3, score: 45, gravatarEmail: 'carol@trybe.com'}}, '/feedback');

    const message = screen.getByTestId('feedback-text')
    const score = screen.getByTestId('feedback-total-score')
    const assertions = screen.getByTestId('feedback-total-question')
    const playAgain = screen.getByRole('link', { name: /Play Again/i })
    const ranking = screen.getByRole('link', { name: /Ranking/i })

    expect(message).toHaveTextContent('Well Done!');
    expect(score).toBeInTheDocument();
    expect(assertions).toBeInTheDocument();
    expect(playAgain).toBeInTheDocument();
    expect(ranking).toBeInTheDocument();
 
    userEvent.click(playAgain);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  it('testa se vai para a rota ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, {player: {name: 'Carol', assertions: 3, score: 45, gravatarEmail: 'carol@trybe.com'}}, '/feedback');

    const ranking = screen.getByRole('link', { name: /Ranking/i })

    expect(ranking).toBeInTheDocument();
 
    userEvent.click(ranking);
    expect(history.location.pathname).toBe('/ranking');

  });

  it('testa se exibe a mensagem correta', () => {
    renderWithRouterAndRedux(<App />, {player: {name: 'Carol', assertions: 2, score: 45, gravatarEmail: 'carol@trybe.com'}}, '/feedback');

    const message = screen.getByTestId('feedback-text')

    expect(message).toHaveTextContent('Could be better...');

  });
});
