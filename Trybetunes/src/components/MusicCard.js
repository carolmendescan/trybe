import React from 'react';
import PropTypes from 'prop-types';
import SavedMusics from './SavedMusics';

class MusicCard extends React.Component {
  render() {
    const { discArt,
      trackName,
      previewUrl, artistBand, trackId, updateList, favoritesPage } = this.props;
    return (
      <div>
        { favoritesPage ? (
          <img
            src={ discArt }
            alt="Capa do álbum"
          />) : ''}
        <div>
          <h4>{trackName}</h4>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
            .
          </audio>
          <SavedMusics
            trackInfo={ {
              trackName,
              discArt,
              previewUrl,
              trackId,
              artistBand,
            } }
            updateList={ updateList }
          />
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  discArt: PropTypes.string,
  trackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  artistBand: PropTypes.string,
  updateList: PropTypes.func,
  favoritesPage: PropTypes.bool,
}.isRequired;

MusicCard.defaultProps = {
  discArt: undefined,
  updateList: null,
  artistBand: '',
  favoritesPage: false,
};

export default MusicCard;
