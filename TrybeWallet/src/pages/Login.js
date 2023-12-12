import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    disabledBtn: true,
    email: '',
    senha: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.handleBtn);
  };

  handleBtn = () => {
    const { email, senha } = this.state;
    const min = 6;
    const validationEmail = /\S+@\S+\.\S+/;
    if ((validationEmail.test(email)) && senha.length >= min) {
      this.setState({
        disabledBtn: false,
      });
    } else {
      this.setState({
        disabledBtn: true,
      });
    }
  };

  render() {
    const { disabledBtn, email } = this.state;
    const { history, dispatch } = this.props;

    return (
      <form
        onSubmit={ (e) => {
          e.preventDefault();
          dispatch(saveEmail(email));
          history.push('/carteira');
        } }
      >
        <h1>Trybe Wallet</h1>
        <input
          data-testid="email-input"
          type="email"
          placeholder="Email"
          name="email"
          onChange={ this.handleChange }
        />
        <input
          data-testid="password-input"
          type="text"
          placeholder="Senha"
          name="senha"
          onChange={ this.handleChange }
        />
        <input
          disabled={ disabledBtn }
          type="submit"
          label="Entrar"
          value="Entrar"
        />
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}.isRequired;

export default connect(null)(Login);
