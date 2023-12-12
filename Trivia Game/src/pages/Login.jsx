import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken } from '../helpers/getToken';
import { saveLogin } from '../redux/action';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  verify = () => {
    const { email, name } = this.state;
    return email.length && name.length;
  };

  handleSubmit = async (e) => {
    const { history, dispatch } = this.props;
    e.preventDefault();
    const token = await getToken();
    localStorage.setItem('token', token.token);
    dispatch(saveLogin(this.state));
    history.push('/Game');
  };

  render() {
    const { name, email } = this.state;

    return (
      <div className="w-screen bg-no-repeat bg-cover bg-defalt h-screen flex">
        <form
          className="
          bg-white
          gap-4
          flex
          rounded-xl
          shadow-md
          flex-col
          max-w-xl
          w-11/12
          h-80
          p-5
          m-auto"
          onSubmit={ this.handleSubmit }
        >
          <div className="flex gap-4 pt-8 flex-col mx-auto w-11/12">
            <input
              data-testid="input-player-name"
              type="name"
              placeholder="Digite seu nome"
              name="name"
              className="h-11  rounded-lg p-2 border border-gray-400"
              value={ name }
              onChange={ this.handleChange }
            />
            <input
              data-testid="input-gravatar-email"
              type="email"
              placeholder="E-mail"
              name="email"
              className="h-11  rounded-lg p-2  border border-gray-400"
              value={ email }
              onChange={ this.handleChange }
            />
          </div>

          <button
            disabled={ !this.verify() }
            data-testid="btn-play"
            type="submit"
            className="
            bg-green-500
            hover:bg-green-600
            transition-colors
            text-white
            text-lg
            font-semibold
            mx-auto
            h-11
            w-11/12
            rounded-lg
            "
          >
            Play
          </button>
          <Link
            to="/settings"
            data-testid="btn-settings"
            className="
            bg-green-700
            hover:bg-green-600
            text-white
              text-lg
              font-semibold
              h-11
              w-11/12
              mx-auto
              rounded-lg
              flex
              justify-center
              items-center
            "
          >
            Configurações
          </Link>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
