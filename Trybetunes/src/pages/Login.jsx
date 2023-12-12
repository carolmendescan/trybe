import React from 'react';
import PropTypes from 'prop-types';
import Img from '../components/background.png';
import { createUser } from '../services/userAPI';
import '../index.css';

class Login extends React.Component {
  state = {
    name: '',
    loading: false,
    buttonDisabled: true,
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationField);
  };

  validationField = () => {
    const {
      name,
    } = this.state;

    const maxLength = 3;
    const validateName = name.length >= maxLength;
    this.setState({
      buttonDisabled: !(validateName),
    });
  };

  onClickButton = async () => {
    const { name } = this.state;
    const { history } = this.props;

    this.setState({ loading: true });
    await createUser({ name });
    this.setState({ loading: false });
    history.push('/search');
  };

  render() {
    const { name, loading, buttonDisabled } = this.state;
    return (
      loading ? <h3>Carregando...</h3>
        : (
          <div
            className="login"
            data-testid="page-login"
          >
            <img src={ Img } alt="background superior azul" className="backgroundBlue" />
            <form>
              <label htmlFor="login-name-input">
                Insira seu nome:
                <input
                  type="text"
                  data-testid="login-name-input"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }

                />
              </label>
              <button
                type="button"
                data-testid="login-submit-button"
                onClick={ () => this.onClickButton() }
                disabled={ buttonDisabled }
              >
                Entrar
              </button>

            </form>
          </div>
        )
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
