import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    checked: false,
  };

  componentDidMount() {
    this.getSongs();
  }

  getSongs = async () => {
    const { music } = this.props;
    this.setState({ loading: true }, async () => {
      const data = await getFavoriteSongs();
      if (data.some((event) => event.trackId === music.trackId)) {
        return this.setState({ loading: false, checked: false });
      }
      return this.setState({ loading: false, checked: false });
    });
  };

  onHandleChange = async (event) => {
    const { checked } = event.target;
    const { music } = this.props;
    this.setState({
      loading: true,
      checked,
    });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      loading: false,
      checked,
    });
  };

  render() {
    const { music, trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div className="music-card">
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <div>
            <div className="imgAlbum">
              <img
                src={ music }
                alt="Capa do álbum"
                className="favorites-album-artwork"
              />
            </div>
            <h4>{ trackName}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label htmlFor="favorite-name">
              Favorita
              <input
                type="checkbox"
                id={ trackId }
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
                name="favorite"
                onChange={ this.onHandleChange }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
