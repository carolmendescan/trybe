import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoritesList: [],
    loading: false,
  };

  componentDidMount() {
    this.getListFavorite();
  }

  getListFavorite = async () => {
    this.setState({ loading: true });
    const favoritesList = await getFavoriteSongs();
    this.setState({ favoritesList, loading: false });
  };

  updateList = () => {
    this.getListFavorite();
  };

  render() {
    const { favoritesList, loading } = this.state;
    return (
      loading ? <h3>Carregando...</h3>
        : (
          <div>
            <Header />
            <div data-testid="page-favorites">
              { favoritesList.length ? favoritesList.map(
                ({ trackName, artistBand, previewUrl, trackId, discArt }) => (
                  <MusicCard
                    key={ trackId }
                    favoritesPage
                    discArt={ discArt }
                    artist={ artistBand }
                    trackName={ trackName }
                    previewUrl={ previewUrl }
                    trackId={ trackId }
                    updateList={ this.updateList }
                  />
                ),
              ) : (<h2>Sua lista de favoritas está vazia.</h2>) }
            </div>
          </div>));
  }
}

export default Favorites;
