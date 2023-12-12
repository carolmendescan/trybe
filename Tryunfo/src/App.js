import React from 'react';
import './index.css';
import Form from './components/Form';
import Card from './components/Card';
import Img from './components/ImagesCss/LogoTryunfo.png';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      rareFilter: 'todas',
      hasTrunfo: false,
      filterTrunfo: false,
      nameFilter: '',
      isSaveButtonDisabled: true,
      cardList: [],
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validationFields = this.validationFields.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.checkHasTrunfo = this.checkHasTrunfo.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value }, this.validationFields);
  }

  onSaveButtonClick(e) {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;
    const arrayCard = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    };

    this.setState((prev) => ({ cardList: [...prev.cardList, arrayCard],
      cardTrunfo: false,
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      isSaveButtonDisabled: true,
    }), this.checkHasTrunfo);
    e.preventDefault();
  }

  checkHasTrunfo() {
    const { cardList } = this.state;
    const findTrunfo = cardList.some((card) => card.cardTrunfo === true);
    this.setState({
      hasTrunfo: findTrunfo,
    });
  }

  validationFields() {
    const {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const validateName = cardName.length > 0;
    const validateImage = cardImage.length > 0;
    const validateDescription = cardDescription.length > 0;
    const total = 210;
    const max = 90;
    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3);
    const validateCard123min = cardAttr1 >= 0 && cardAttr2 >= 0 && cardAttr3 >= 0;
    const validateCard123max = cardAttr1 <= max && cardAttr2 <= max && cardAttr3 <= max;
    const validateCard123sum = sum <= total;

    this.setState({
      isSaveButtonDisabled: !(validateName
        && validateImage
        && validateDescription
        && validateCard123min
        && validateCard123max
        && validateCard123sum
      ),
    });
  }

  removeItem({ target }) {
    const getId = target.id;
    const { cardList } = this.state;

    const verifyDeleted = cardList.filter((card) => card.cardName !== getId);
    const findTrunfo = verifyDeleted.some((card) => card.cardTrunfo === true);
    this.setState({
      cardList: verifyDeleted,
      hasTrunfo: findTrunfo,
    });
  }

  render() {
    const { cardList, nameFilter, rareFilter, filterTrunfo } = this.state;
    return (
      <div className="App">
        <img id="logoImg" src={ Img } alt="tryunfo Logo" />
        <h1>🦒🐢🦅Tryunfo Animal🐘🐊🦧🐳</h1>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card
          { ...this.state }
        />
        <label htmlFor="nameFilter">
          Filtrar por Nome:
          <input
            data-testid="name-filter"
            type="text"
            id="nameFilter"
            name="nameFilter"
            value={ nameFilter }
            onChange={ this.onInputChange }
            disabled={ filterTrunfo }
          />
        </label>
        <label htmlFor="rareFilter">
          Filtrar Animal raro:
          <select
            id="rareFilter"
            name="rareFilter"
            data-testid="rare-filter"
            value={ rareFilter }
            onChange={ this.onInputChange }
            disabled={ filterTrunfo }
          >
            <option>todas</option>
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <label htmlFor="filterTrunfo">
          Filtrar Trunfo:
          <input
            type="checkbox"
            id="filterTrunfo"
            name="filterTrunfo"
            data-testid="trunfo-filter"
            checked={ filterTrunfo }
            onChange={ this.onInputChange }
          />
        </label>
        <ul className="body">
          {cardList.filter(
            (card) => {
              if (filterTrunfo) return card.cardTrunfo;
              return card.cardName.includes(nameFilter)
             && (card.cardRare === rareFilter || rareFilter === 'todas');
            },
          )
            .map((card) => (
              <li key={ card.cardName } className="container">
                <Card
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardImage={ card.cardImage }
                  cardRare={ card.cardRare }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  data-testid="delete-button"
                  type="button"
                  id={ card.cardName }
                  onClick={ this.removeItem }
                >
                  Excluir
                </button>
              </li>
            ))}
        </ul>
      </div>
    );
  }
}

export default App;
