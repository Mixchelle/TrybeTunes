import PropTypes from 'prop-types';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../style/musicCard.css';

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
      if (data.some((song) => song.trackId === music.trackId)) {
        return this.setState({ loading: false, checked: true });
      }
      return this.setState({ loading: false, checked: false });
    });
  };

  onHandleChange = async () => {
    const { checked } = this.state;
    const { music } = this.props;
    this.setState({ loading: true });
    if (!checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState((prevState) => ({
      loading: false,
      checked: !prevState.checked,
    }));
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div className="music-card">
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <div>
            <h4>{trackName}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
            </audio>
            <label className="form-check-label" htmlFor={ trackId }>
              <input
                type="checkbox"
                id={ trackId }
                className="heart-icon"
                style={ { cursor: 'pointer' } }
                checked={ checked }
                onChange={ this.onHandleChange }
              />
              <FontAwesomeIcon
                icon={ faHeart }
                className={ `heart-icon ${checked ? 'text-danger' : ''}` }
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
