import React from 'react';
import { screen } from "@testing-library/react";
import renderWithRouterAndRedux from "../helpers/renderWithRouterAndRedux";
import App from "../../App";
import userEvent from '@testing-library/user-event';

describe('Testa a tela Settings', () => {
  it('testa se aparece configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />, {player: {name: 'Carol', assertions: 3, score: 45, gravatarEmail: 'carol@trybe.com'}});

    userEvent.click(screen.getByTestId('btn-settings'));
    const { location: { pathname } } = history;
    expect(pathname).toBe('/settings');

  })
});

