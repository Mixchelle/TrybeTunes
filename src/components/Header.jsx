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
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search" data-testid="link-to-search">Search</Link>
          </li>
          <li>
            <Link to="/album/:id">Album</Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">Profile</Link>
          </li>
        </ul>
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
