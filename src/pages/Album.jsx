import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      artist: '',
      music: '',
      title: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.getInfoAlbunId();
  }

  getInfoAlbunId = async () => {
    const { match: { params: { id } } } = this.props;
    const listResult = await getMusics(id);
    const songs = listResult.reduce((acc, song) => {
      const { trackName, previewUrl, trackId, collectionName, kind } = song;
      if (kind === 'song') {
        acc.push({ trackName, collectionName, previewUrl, trackId });
      }
      return acc;
    }, []);
    const album = listResult[0];
    const { collectionName, artistName, artworkUrl100 } = album;
    this.setState({
      title: collectionName,
      artist: artistName,
      music: artworkUrl100,
      tracks: songs,
    });
  };

  render() {
    const { title, artist, music, tracks, loading } = this.state;
    return (
      <div>
        <Header />
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <div>
            <div>
              <img src={ music } alt={ `Capa do álbum ${title}` } />
            </div>
            <div>
              <h2 data-testid="album-name">{ title }</h2>
              <h3 data-testid="artist-name">{ artist }</h3>
            </div>
            <div className="musiclist">
              { tracks.map(({ trackId, trackName, previewUrl }) => (
                <MusicCard
                  key={ trackId }
                  music={ music }
                  trackId={ trackId }
                  artist={ artist }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                />))}
            </div>
          </div>
        )}
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
