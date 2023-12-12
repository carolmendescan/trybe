import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class SavedMusics extends React.Component {
  state = {
    favorite: false,
    loading: false,
  };

  componentDidMount() {
    this.favoriteSong();
  }

  // favoriteSong seta o estado favorite para true ou false depois de comparar se as musicas que favoritei tem id igual as musicas do meu objeto props.
  favoriteSong = async () => {
    const { trackInfo: { trackId } } = this.props;
    const songs = await getFavoriteSongs();
    const favorite = songs ? songs
      .some((music) => music.trackId === trackId) : false;
    this.setState({ favorite });
    return favorite;
  };

  checkFavorite = async (favorite) => {
    const { trackInfo } = this.props;
    const addRemove = favorite ? removeSong : addSong;
    this.setState({ loading: true });
    await addRemove(trackInfo);
    this.setState({ loading: false, favorite: !favorite });
  };

  render() {
    const { trackInfo: { trackId }, updateList } = this.props;
    const { favorite, loading } = this.state;

    return (
      loading ? <h3>Carregando...</h3> : (
        <label
          htmlFor={ trackId }
        >
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id={ trackId }
            checked={ favorite }
            onChange={ () => {
              this.checkFavorite(favorite);
              if (updateList) updateList();
            } }
          />
        </label>));
  }
}

SavedMusics.propTypes = {
  trackInfo: PropTypes.shape({
    trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    trackName: PropTypes.string.isRequired,
    artistBand: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  updateList: PropTypes.func,
};

SavedMusics.defaultProps = {
  updateList: null,
};

export default SavedMusics;
