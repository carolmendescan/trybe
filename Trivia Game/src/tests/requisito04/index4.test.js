import { act, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import App from '../../App'
import userEvent from '@testing-library/user-event';
import mockToken from "../mock";

describe('4 - Desenvolva testes para atingir 90% de cobertura da tela de Login', () => {
  it('testa se o botao com o nome "Play" na tela de login e desabilitado', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByRole('button', {name: /play/i})
    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(true);

  })

  it('Testa se o botao de config vai para a tela de configuracoes', () => {
    renderWithRouterAndRedux(<App />);

    const buttonConfig = screen.getByRole('link', { name: /configurações/i })

    userEvent.click(buttonConfig)
    // screen.logTestingPlaygroundURL()

    const configTitle = screen.getByRole('heading', {level: 3, name: /configurações/i})
    expect(configTitle).toBeInTheDocument();
  })

  it('Testa se o botao play e ativado ao digitar nos inupt', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockToken),
    });
    const { history, store } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole('button', {name: /play/i})

    userEvent.type(inputName, 'Hunter Bowers')
    userEvent.type(inputEmail, 'xywixuzyfi@mailinator.com')

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay.disabled).toBe(false);
    
    act(() => {
      userEvent.click(buttonPlay);
    });
    
    console.log(store.getState())
    // await waitForElementToBeRemoved(buttonPlay, {timeout: 3000})

    // const { location: { pathname } } = history;
    // await waitFor(() => expect(pathname).toBe('/Game'));

    // screen.logTestingPlaygroundURL()
  })
})