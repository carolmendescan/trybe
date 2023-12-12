import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  shouldComponentUpdate(prevState) {
    const { total } = this.props;
    return (prevState.total !== total);
  }

  render() {
    const { email, total } = this.props;
    return (
      <div>
        <h1>Trybe Wallet</h1>
        <div data-testid="total-field">{total}</div>
        <div data-testid="header-currency-field">BRL</div>
        <div data-testid="email-field">{ email }</div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  total: PropTypes.number,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

export default connect(mapStateToProps)(Header);
