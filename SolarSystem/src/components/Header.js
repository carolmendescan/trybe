import React from 'react';
import logo from '../images/logo-sistema-solar.png';

class Header extends React.Component {
  render() {
    return (
      <header>
        <img src={ logo } alt="logo" className="logo" />
        <h1 id="tit">Sistema Solar</h1>
      </header>
    );
  }
}

export default Header;
