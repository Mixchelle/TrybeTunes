import PropTypes from 'prop-types';
import React from 'react';

class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl, music } = this.props;
    return (
      <div className="music-card">
        <div className="imgAlbum">
          <img
            src={ music }
            alt="Capa do álbum"
            className="favorites-album-artwork"
          />
        </div>
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.string,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
};

MusicCard.defaultProps = {
  music: undefined,
};
export default MusicCard;
