import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getAsks } from '../helpers/getAsks';
import { saveScore } from '../redux/action/index';

class Game extends Component {
  state = {
    asks: [],
    atualAskIndex: 0,
    clicked: -1,
    timeExpired: false,
    seconds: 30,
    assertions: 0,
  };

  interval = null;

  componentDidMount() {
    this.asyncAsk();
  }

  asyncAsk = async () => {
    const { history } = this.props;
    const ask = await getAsks();
    if (ask.results.length <= 0) {
      history.push('/');
    }
    const randomizenumber = 0.5; // 0.5

    const asks = ask.results.map((aask) => ({
      ...aask,
      allAnswers: [...aask.incorrect_answers, aask.correct_answer].sort(
        () => Math.random() - randomizenumber,
      ),
    }));

    this.setState({ asks });
    this.timer();
  };

  nextAsk = () => {
    const { atualAskIndex } = this.state;
    const totalAsks = 4;
    this.setState({
      atualAskIndex: atualAskIndex + 1,
      seconds: 30,
      timeExpired: false,
    });
    clearInterval(this.interval);
    this.timer();
    if (atualAskIndex === totalAsks) {
      const { history } = this.props;
      history.push('/feedback');
    }
  };

  selectAnswer = (iscorrect) => {
    const { atualAskIndex, asks, seconds, assertions } = this.state;
    const { dispatch } = this.props;
    this.setState({ clicked: atualAskIndex });
    clearInterval(this.interval);
    const difficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    if (iscorrect) {
      const dificultySum = 10;
      const score = dificultySum + (seconds * difficulty[asks[atualAskIndex].difficulty]);
      const newAssertions = assertions + 1;
      this.setState({
        assertions: newAssertions,
      });
      dispatch(saveScore({ score, assertions: newAssertions }));
    }
  };

  timer = () => {
    const second = 1000;
    this.interval = setInterval(() => {
      const { seconds } = this.state;
      // console.log(seconds);
      if (seconds === 0) {
        clearInterval(this.interval);
        this.setState({ timeExpired: true });
        return;
      }
      this.setState({
        seconds: seconds - 1,
      });
    }, second);
  };

  render() {
    const { asks, atualAskIndex, clicked, timeExpired, seconds } = this.state;
    const atualAsk = asks[atualAskIndex] || [];
    const percentage = 3.33;
    console.log(atualAsk.allAnswers);
    return (
      <div
        className="
        w-screen
        overflow-hidden
        bg-no-repeat
        bg-cover
        h-screen
        bg-defalt"
      >
        <Header />
        <div
          style={ {
            width: `${seconds * percentage}%`,
          } }
          className="bg-red-500 h-5"
        />
        <div
          className="
         h-full
         items-center
         justify-center
         lg:w-8/12
         m-auto
         sm:flex-row
         flex-col
         px-10
         flex"
        >
          <div
            className="
            shadow-md
            bg-white
            flex
            flex-col
            justify-center
            items-center
            rounded-lg
            relative
            max-w-lg
            w-3/6
            text-center
            font-bold
            px-5
            h-[300px]"
          >
            <h3
              className="
              shadow-sm
              bg-green-500
              flex
              items-center
              justify-center
              h-10 absolute
              w-[97%]
              text-white
              rounded-lg
              -top-5"
              data-testid="question-category"
            >
              {atualAsk.category}
            </h3>
            <h4 className="text-lg" data-testid="question-text">
              {atualAsk.question}
            </h4>
            <p className="absolute bottom-2 text-xl text-red-500">
              {seconds ? (
                <>
                  Tempo:
                  {' '}
                  {seconds}
                </>) : <>Tempo esgotado</>}
            </p>
          </div>
          <div className="w-1/2">
            <div
              className="w-full flex flex-col gap-2 p-10"
              data-testid="answer-options"
            >
              {atualAsk.allAnswers?.map((answer, index) => {
                const iscorrect = atualAsk.correct_answer === answer;
                return (
                  <button
                    type="button"
                    key={ index }
                    className="w-full bg-white hover:bg-purple-100 rounded-lg h-10"
                    onClick={ () => this.selectAnswer(iscorrect) }
                    disabled={ timeExpired }
                    style={
                      clicked === atualAskIndex
                        ? {
                          border: iscorrect
                            ? '3px solid rgb(6, 240, 15)'
                            : '3px solid red',
                        }
                        : {}
                    }
                    data-testid={
                      !iscorrect ? `wrong-answer-${index}` : 'correct-answer'
                    }
                  >
                    {answer}
                  </button>
                );
              })}
              {(timeExpired || clicked === atualAskIndex) && (
                <button
                  className="bg-green-500 w-full font-semibold text-white h-10 rounded-lg"
                  data-testid="btn-next"
                  onClick={ () => this.nextAsk() }
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Game);
