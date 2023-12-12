import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getGravatar } from '../helpers/getGravatar';

class Header extends Component {
  render() {
    const { name, score, gravatarEmail } = this.props;
    const gravatar = getGravatar(gravatarEmail);
    return (
      <header className="flex justify-between items-center bg-gray-200 h-20 px-10">
        <Link to="/" className="flex justify-center items-center gap-2">
          <img className="rounded-full w-10 h-10" src="https://i.pinimg.com/736x/69/56/e0/6956e066e1448e46efce6dbfa474a37d.jpg" alt="icon" />
          <h1 className="text-xl font-mono font-bold">
            Trivia
          </h1>
        </Link>
        <div className="flex gap-20">
          <div className="flex items-center gap-2 justify-center">
            <img
              data-testid="header-profile-picture"
              src={ gravatar }
              className="rounded-full w-10 h-10"
              alt="avatar"
            />
            <h3 data-testid="header-player-name">{ name }</h3>
          </div>
          <div className="flex items-center justify-center gap-1">
            <p>Score:</p>
            <h3 data-testid="header-score">{ score }</h3>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  gravatarEmail: state.player.gravatarEmail,
});

Header.propTypes = {
  getGravatar: PropTypes.func,
  name: PropTypes.string,
  score: PropTypes.string,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
