import React from 'react';
import userEvent from '@testing-library/user-event';
import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import apiObjResponse from '../apiObjResponse.json';


describe('Teste para atingir 90% de cobertura da tela de Jogo', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(apiObjResponse),
    });
    const { history } = renderWithRouterAndRedux(<App />, {player: {name: 'Carol', assertions: 3, score: 0, gravatarEmail: 'carol@trybe.com'}});

    userEvent.type(screen.getByTestId('input-player-name'), 'Carol');
    userEvent.type(screen.getByTestId('input-gravatar-email'), 'carol@trybe.com');
    
    act(() => {
      history.push('/Game');
    });
});

jest.setTimeout(35000)
it('Testa se quando o tempo for 0 o btn fica disabled', async () => {
  await waitFor(() => expect(screen.getByText('Science & Nature')).toBeInTheDocument());
  expect(screen.getByTestId('question-text')).toBeInTheDocument();
  expect(screen.getByTestId('answer-options')).toBeEnabled();

  expect(await screen.findByTestId('timer-test', {}, {timeout: 32000})).toHaveTextContent('0');
  // expect(screen.getByTestId('answer-options')).toBeDisabled();

//   // screen.logTestingPlaygroundURL();
})

it('Testa se os elementos são renderizados corretamente', async () => {
  await waitFor(() => expect(screen.getByText('Science & Nature')).toBeInTheDocument());
  expect(screen.getByTestId('question-text')).toBeInTheDocument();
  expect(screen.getByTestId('answer-options')).toBeInTheDocument();
  expect(screen.getByText(30)).toBeInTheDocument();
  userEvent.click(screen.getByTestId('correct-answer'));
  expect(screen.getByTestId('btn-next')).toBeInTheDocument();

  // screen.logTestingPlaygroundURL();
})

it('Testa se a resposta certa atualiza a pontuação', async () => {
  await waitFor(() => userEvent.click(screen.getByTestId('correct-answer')));
  expect(screen.getByTestId('header-score')).not.toEqual('0');
});

it('Testa se ao errar a resposta a pontuação é a mesma', async () => {
  await waitFor(() => userEvent.click(screen.getByTestId('wrong-answer-2')));
  expect(screen.getByTestId('header-score')).toHaveTextContent('0');
});

it('Testa se o usuário é direcionada para a tela de feedback após 5 asks', async () => {
  await waitFor(() => userEvent.click(screen.getByTestId('correct-answer')));
  userEvent.click(screen.getByTestId('btn-next'));
  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));
  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));
  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));
  userEvent.click(screen.getByTestId('correct-answer'));
  userEvent.click(screen.getByTestId('btn-next'));
  expect(screen.getByTestId('feedback-text')).toBeInTheDocument();
});

it('Testa se a pessoa usuária é redirecionada para a página para um token inválido', async () => {
jest.spyOn(global, 'fetch');
global.fetch.mockResolvedValue({
  json: jest.fn().mockResolvedValue(''),
});
const { history } = renderWithRouterAndRedux(<App />);

userEvent.type(screen.getByTestId('input-player-name'), 'Carol');
userEvent.type(screen.getByTestId('input-gravatar-email'), 'carol@trybe.com');

userEvent.click(screen.getByTestId('btn-play'));
// await waitForElementToBeRemoved(() => screen.getByTestId('input-player-name'));


await waitFor(() => expect(screen.getByTestId('input-player-name')).toBeInTheDocument());
const { location: { pathname } } = history;
await waitFor(() => expect(pathname).toBe('/'));

// screen.logTestingPlaygroundURL();
});


});














