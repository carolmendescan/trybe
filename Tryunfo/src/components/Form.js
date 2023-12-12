import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      onSaveButtonClick,
      hasTrunfo,
      onInputChange,
    } = this.props;
    return (
      <div>
        <h1>ADICIONE NOVA CARTA</h1>
        <form>
          <label htmlFor="name-input">
            Nome do Animal:
            <input
              type="text"
              id="name-input"
              name="cardName"
              data-testid="name-input"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="textarea"
              id="description-input"
              name="cardDescription"
              data-testid="description-input"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr1-input">
            Speed:
            <input
              min={ 0 }
              max={ 90 }
              type="number"
              id="attr1-input"
              name="cardAttr1"
              data-testid="attr1-input"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr2-input">
            Energy:
            <input
              min={ 0 }
              max={ 90 }
              type="number"
              id="attr2-input"
              name="cardAttr2"
              data-testid="attr2-input"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="attr3-input">
            Power:
            <input
              min={ 0 }
              max={ 90 }
              type="number"
              id="attr3-input"
              name="cardAttr3"
              data-testid="attr3-input"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="image-input">
            Imagem:
            <input
              type="text"
              id="image-input"
              name="cardImage"
              data-testid="image-input"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="rare-input">
            Raridade:
            <select
              id="rare-input"
              name="cardRare"
              data-testid="rare-input"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>
          {
            hasTrunfo ? <p>Você já tem um Super Trunfo em seu baralho</p> : (
              <label htmlFor="trunfo-input">
                Super Animal Trunfo
                <input
                  type="checkbox"
                  id="trunfo-input"
                  name="cardTrunfo"
                  data-testid="trunfo-input"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                />
              </label>)
          }
          <button
            id="save-button"
            name="saveButton"
            data-testid="save-button"
            disabled={ isSaveButtonDisabled }
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>

        </form>

      </div>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
