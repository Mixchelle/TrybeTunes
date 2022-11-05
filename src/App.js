import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Login from './pages/Login';
import notFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/profile/edit" component={ ProfileEdit } />
            <Route exact path="/album/:id" component={ Album } />
            <Route exact path="/profile" component={ Profile } />
            <Route exact path="/favorites" component={ Favorites } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/" component={ Login } />
            <Route path="" component={ notFound } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
