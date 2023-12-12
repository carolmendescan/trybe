import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import { initialState } from './InitialState';
import Wallet from '../pages/Wallet';

const addText = 'Adicionar despesa';

describe('Testes requisito 5', () => {
  test('Verifica se a tela Home é renderizada corretamente', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/'] });

    const heading = screen.getByRole('heading', { level: 1 });
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputSenha = screen.getByPlaceholderText('Senha');
    const btnEntrar = screen.getByText('Entrar');

    expect(heading).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputSenha).toBeInTheDocument();
    expect(btnEntrar).toBeInTheDocument();

    userEvent.type(inputEmail, 'tryber@teste');
    expect(btnEntrar).toBeDisabled();
    userEvent.type(inputSenha, '123');
    expect(btnEntrar).toBeDisabled();
    userEvent.type(inputEmail, 'tryber@teste.com');
    userEvent.type(inputSenha, '123456');
    expect(btnEntrar).not.toBeDisabled();

    userEvent.click(btnEntrar);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
  test('testa elementos do header', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(screen.getByText('tryber@teste.com')).toBeInTheDocument();
    expect(screen.getByText(/BRL/i)).toBeInTheDocument();
  });
  test('testa a rota carteira com uma expense adicionada', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    expect(screen.getByText(/bota/i)).toBeInTheDocument();
  });
  test('testa o botao de deletar e editar', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const btnAdicionarEditar = screen.getByText(addText);
    const inputDescription = screen.getByLabelText(/Descrição da despesa/i);
    const inputValue = screen.getByLabelText(/Valor/i);
    const inputMoeda = screen.getByLabelText(/Moeda/i);
    const inputMethod = screen.getByLabelText(/Método de Pagamento/i);
    const inputCategory = screen.getByLabelText(/Categoria da despesa/i);
    const btnEdit = screen.getAllByTestId('edit-btn');
    const btnDelete = screen.getAllByTestId('delete-btn');
    const bota = screen.getByText(/bota/i);
    const total = screen.getByText('16.79');

    expect(inputDescription).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(btnAdicionarEditar).toBeInTheDocument();
    expect(inputMoeda).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputCategory).toBeInTheDocument();

    expect(btnEdit[0]).toBeInTheDocument();
    expect(btnDelete[0]).toBeInTheDocument();
    expect(btnEdit[1]).toBeInTheDocument();
    expect(btnDelete[1]).toBeInTheDocument();
    expect(total).toBeInTheDocument();

    userEvent.click(btnEdit[0]);
    expect(btnAdicionarEditar).toHaveTextContent(/Editar despesa/i);
    userEvent.click(btnAdicionarEditar);
    expect(btnAdicionarEditar).toHaveTextContent(/Adicionar despesa/i);

    userEvent.click(btnDelete[0]);

    expect(bota).not.toBeInTheDocument();
  });

  test('testa a interação com os elementos', () => {
    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'], initialState });

    const inputValue = screen.getByLabelText(/Valor/i);
    const btnAdicionarEditar = screen.getByText(addText);
    const inputDescription = screen.getByLabelText(/Descrição da despesa/i);
    const bota = screen.getByText(/bota/i);

    userEvent.type(inputDescription, 'dado');
    userEvent.type(inputValue, '2');
    userEvent.click(btnAdicionarEditar);

    const dado = screen.getByText(/dado/i);
    const dois = screen.getAllByDisplayValue(/2/i);
    expect(dado).toBeInTheDocument();
    expect(dois).toBeDefined();
    expect(bota).toBeInTheDocument();
  });

  test('Testa o fetch', async () => {
    renderWithRouterAndRedux(<Wallet />);

    await waitFor(() => expect(screen.getByText('USD')).toBeVisible());
  });

  test('Testa o botão Adicionar Despesa', async () => {
    renderWithRouterAndRedux(<Wallet />);

    const inputValue = screen.getByLabelText(/Valor/i);
    const btnAdicionarEditar = screen.getByText(addText);
    const inputDescription = screen.getByLabelText(/Descrição da despesa/i);

    userEvent.type(inputDescription, 'bike');
    userEvent.type(inputValue, '3');
    userEvent.click(btnAdicionarEditar);

    await waitFor(() => expect(screen.getByRole('cell', { name: /bike/i })).toBeVisible());
  });
});
