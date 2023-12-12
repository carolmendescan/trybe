import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { resetScore } from '../redux/action';
import { getGravatar } from '../helpers/getGravatar';

class Feedback extends Component {
  localCreation = () => {
    const { assertions, score, gravatarEmail, name, dispatch } = this.props;
    const players = {
      name,
      score,
      assertions,
      gravatarEmail,
    };
    console.log(players);
    if (localStorage.getItem('ranking')) {
      const pullingLocal = JSON.parse(localStorage.getItem('ranking'));
      localStorage.setItem('ranking', JSON.stringify([...pullingLocal, players]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([players]));
    }
    dispatch(resetScore());
  };

  render() {
    const { assertions, score, dispatch, gravatarEmail, name } = this.props;
    const tres = 3;
    console.log(name);
    const message = assertions >= tres ? 'Well Done!' : 'Could be better...';
    const color = assertions >= tres ? 'green' : 'red';
    const gravatar = getGravatar(gravatarEmail);
    return (
      <div className="h-screen w-screen">
        <div className="absolute -z-10">
          <Header />
        </div>
        <div
          className="
            bg-defalt
            bg-no-repeat
            bg-cover
            flex
            flex-col
            items-center
            justify-center
            h-full
            relative
            "
        >
          <div
            className="
         bg-white
           flex
           flex-col
           items-center
           pt-[102px]
           w-11/12
           max-w-lg
           h-80
           mx-auto
           rounded-2xl
           relative"
          >
            <img
              src={ gravatar }
              className="
              border-4
              border-green-500
              absolute
              left-1/2
              transform
              -top-24
              -translate-x-1/2
              h-48
              w-48
              rounded-full"
              alt="gravatar"
            />
            <p className="pb-3 text-2xl font-semibold">{name}</p>
            <h3
              style={ {
                color,
              } }
              className="text-4xl font-mono text-bold"
              data-testid="feedback-text"
            >
              { message }
            </h3>
            <div
              className="absolute
            text-center bottom-7 text-xl text-gray-600 font-medium"
            >
              You got
              {' '}
              <span
                data-testid="feedback-total-question"
              >
                { assertions }
              </span>
              {' '}
              questions right
              <br />
              Out of a total of 5 questions
              <br />
              Total Score:
              {' '}
              <span data-testid="feedback-total-score">{ score }</span>
            </div>
          </div>

          <div
            className="w-11/12
            pt-3
            flex
            justify-between
            text-xl
            text-white
            font-bold
            max-w-lg"
          >
            <div
              className="bg-green-500
              hover:bg-green-600
               rounded-lg
               transition-colors
               w-[47%]
               h-12"
            >
              <Link
                to="/"
                data-testid="btn-play-again"
                className="w-full h-full flex justify-center items-center"
                onClick={ () => dispatch(resetScore) }
              >
                Play Again
              </Link>
            </div>
            <div
              className="bg-blue-400
              transition-colors
            hover:bg-blue-600
              rounded-lg
              w-[47%]
              h-12"
            >
              <Link
                className="w-full h-full flex justify-center items-center"
                to="/ranking"
                data-testid="btn-ranking"
                onClick={ () => this.localCreation() }
              >
                Ranking
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  name: state.player.name,
  gravatarEmail: state.player.gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number,
  score: PropTypes.number,
  gravatarEmail: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Feedback);
