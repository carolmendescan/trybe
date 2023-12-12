import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    album: '',
    artistBand: '',
    discArt: '',
    tracks: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    // console.log(response);
    const foundedMusics = response.reduce((acc, cur) => {
      const { trackName, previewUrl, trackId, collectionName, kind } = cur;

      if (kind === 'song') {
        acc.push({ trackName, collectionName, previewUrl, trackId });
      }
      return acc;
    }, []);
    const album = response[0];
    const { artistName, collectionName, artworkUrl100 } = album;

    this.setState({
      album: collectionName,
      artistBand: artistName,
      discArt: artworkUrl100,
      tracks: foundedMusics,
    });
  };

  render() {
    // console.log(this.props);
    // console.log(this.fetchMusic());
    const { album, artistBand, discArt, tracks } = this.state;

    return (
      <div>
        <Header />
        <div data-testid="page-album"> Você está em Album</div>
        <div>
          <img src={ discArt } alt={ `Capa do álbum: ${album}` } />
          <div>
            <div data-testid="artist-name">{ artistBand }</div>
            <div data-testid="album-name">{ album }</div>
          </div>
        </div>
        <div>
          {tracks.map(({ trackId, trackName, previewUrl }) => (
            <MusicCard
              key={ trackId }
              discArt={ discArt }
              trackId={ trackId }
              artistBand={ artistBand }
              trackName={ trackName }
              previewUrl={ previewUrl }
            />))}

        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default Album;
