import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      singerSearch: '',
      buttonDisabled: true,
      loading: false,
      albumsList: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minCaaracteres = 2;
    this.setState({
      [name]: value,
      buttonDisabled: value.length < minCaaracteres,
    });
  };

  submitBtn = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const results = await searchAlbumsAPI(search);
    this.setState({
      albumsList: results, loading: false, singerSearch: search, search: '',
    });
  };

  render() {
    const { search, buttonDisabled, singerSearch, albumsList, loading } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-search" className="search">
          <form className="pesquisa">
            <div className="search-div">
              <input
                data-testid="search-artist-input"
                type="text"
                placeholder="Nome do Artista ou Banda"
                name="search"
                value={ search }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ buttonDisabled }
                onChange={ this.handleChange }
                onClick={ this.submitBtn }
              >
                Procurar
              </button>
            </div>
          </form>
        </div>
        <Loading loading={ loading } />
        { albumsList
          ? <h1>{albumsList.length > 0 && `Resultado de álbuns de: ${singerSearch}`}</h1>
          : '' }
        <ul>
          { albumsList.length > 0
            ? albumsList
              .map((album) => (
                <li key={ album.collectionId }>
                  <Link
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <p>{`Álbum: ${album.collectionName}`}</p>
                    <p>{album.artistName}</p>
                    <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  </Link>
                </li>
              ))
            : <h1>Nenhum álbum foi encontrado</h1>}
        </ul>
      </div>
    );
  }
}

export default Search;
