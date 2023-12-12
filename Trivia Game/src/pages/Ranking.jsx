import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  // const { assertions, score, gravatarEmail, name } = this.props;
  componentDidMount() {
    const localPull = JSON.parse(localStorage.getItem('ranking'));
    localPull.sort((a, b) => b.score - a.score);
    this.setState({ ranking: localPull });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div
        className="bg-defalt
          flex-col
          h-screen
          bg-no-repeat
          flex
          justify-center
          items-center
          bg-cover"
      >
        <div
          className="h-[500px]
         rounded-lg
         max-w-xl
         items-center
         flex flex-col
         bg-white
         w-11/12"
        >
          <h1
            data-testid="ranking-title"
            className="text-purple-700 mt-8 font-semibold text-3xl"
          >
            Ranking
          </h1>
          <div
            className="
            flex
            w-11/12
            mb-2
            font-semibold
            text-lg
            px-2
           bg-gray-200
            rounded-lg mt-8"
          >
            <p className="w-[20%]" />
            <p className="pl-2 w-[26%]">Name</p>
            <p className="w-[20%]">Score</p>
            <p>Assertions</p>
          </div>
          <div className="w-11/12 max-h-[270px] overflow-auto flex flex-col gap-2">
            {ranking.map((player, index) => (
              <div
                className="flex
                  p-2
                  w-full
                  m-auto
                  items-center
                bg-gray-200
                  rounded-lg"
                key={ index }
              >
                <div className="w-1/4">
                  <img
                    className="rounded-full w-12 h-12"
                    src={ `https://www.gravatar.com/avatar/${md5(
                      player.gravatarEmail,
                    ).toString()}` }
                    alt="player"
                  />
                </div>
                <p className="w-1/4" data-testid={ `player-name-${index}` }>
                  {player.name}
                </p>
                <p className="w-1/4" data-testid={ `player-score-${index}` }>
                  {player.score}
                </p>
                <p className="pr-3">{player.assertions}</p>
              </div>
            ))}
          </div>
          <Link
            className="
            bg-green-500
            h-12
            w-28
            flex
            items-center
            justify-center
            rounded-lg
            text-white
            text-lg
            font-semibold
            mt-4"
            to="/"
            data-testid="btn-go-home"
          >
            Play Again
          </Link>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
}.isRequired;

export default Ranking;
