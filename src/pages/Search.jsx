import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <imput type="text" data-testid="search-artist-input" />
          <button type="submit" name="myButton" value="pesquisar">
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
