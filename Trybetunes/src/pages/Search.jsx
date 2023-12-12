import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsApi from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    buttonDisabled: true,
    name: '',
    musicsArr: '',
    artist: '',
    toShow: false,
  };

  onInputChangeSearch = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validationFieldSearch(value));
  };

  validationFieldSearch = (inputValue) => {
    const minLength = 2;
    const validateName = inputValue.length >= minLength;
    this.setState({
      buttonDisabled: !(validateName),
    });
  };

  onClickSearch = async () => {
    const { name } = this.state;
    const returnedAlbums = await searchAlbumsApi(name);
    if (returnedAlbums.length === 0) this.setState({ musicsArr: '' });
    if (returnedAlbums.length > 0) this.setState({ musicsArr: returnedAlbums });
    this.setState({ artist: name, name: '', toShow: true });
  };

  musicsArr = () => {
    const { musicsArr } = this.state;
    return musicsArr
      .map((album) => (
        <div key={ album.collectionName }>
          <p>
            {album.collectionName}
          </p>
          <Link
            to={ `/album/${album.collectionId}` }
            data-testid={ `link-to-album-${album.collectionId}` }
          >
            <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          </Link>
        </div>));
  };

  render() {
    const { name, buttonDisabled, musicsArr, artist, toShow } = this.state;
    const artistResponse = musicsArr ? (
      <div>
        <h3>{`Resultado de álbuns de: ${artist}`}</h3>
        {this.musicsArr()}
      </div>) : <p>Nenhum álbum foi encontrado</p>;
    return (
      <div>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="search-artist-input">
              <input
                type="text"
                data-testid="search-artist-input"
                name="name"
                value={ name }
                onChange={ this.onInputChangeSearch }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ buttonDisabled }
              onClick={ this.onClickSearch }
            >
              Pesquisar
            </button>
          </form>
          {toShow ? artistResponse : ''}
        </div>
      </div>
    );
  }
}

export default Search;
