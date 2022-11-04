import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo() {
    getUser()
      .then(({ name }) => {
        this.setState({
          userName: name });
      });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/search" component={ Search } data-testid="page-search"/>
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
        </Switch>
        <div data-testid="header-user-name" className="header-user-name">
          <span className="user-name">{ userName }</span>
        </div>
        <nav className="menu">
          <Link to="/">Home</Link>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/album/:id">Album</Link>
          <Link to="/favorites" data-testid="link-to-favorites" >Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile" >Profile</Link>
          <Link to="/profile/edit">Profile edit</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
