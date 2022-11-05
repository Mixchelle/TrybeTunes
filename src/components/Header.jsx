import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    getUser()
      .then(({ name }) => {
        this.setState({
          userName: name, loading: false });
      });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <p>TrybeTunes</p>
        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/album/:id">Album</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          <Link to="/profile/edit">Profile edit</Link>
        </nav>
        <div data-testid="header-user-name" className="header-user-name">
          { loading
            ? <Loading loading={ loading } />
            : (
              <h3 className="user-name">{userName}</h3>
            ) }
        </div>
      </header>
    );
  }
}

export default Header;
