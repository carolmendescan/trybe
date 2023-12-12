import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends React.Component {
  state = {
    name: '',
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { name } = await getUser();
    this.setState({ name, loading: false });
  }

  render() {
    const { name, loading } = this.state;

    return (
      <header
        className="Header"
        data-testid="header-component"
      >
        <div>
          {loading
            ? <div>Carregando...</div>
            : <div data-testid="header-user-name">{ name }</div> }
        </div>
        <ul className="linkUl">
          <li>
            <Link
              className="link"
              data-testid="link-to-search"
              to="/search"
            >
              Pesquisar Música

            </Link>
          </li>
          <li>
            <Link
              className="link"
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Músicas Favoritas

            </Link>
          </li>
          <li>
            <Link
              className="link"
              data-testid="link-to-profile"
              to="/profile"
            >
              Perfil

            </Link>
          </li>
        </ul>

      </header>
    );
  }
}

export default Header;
