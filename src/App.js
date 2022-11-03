import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" render={ () => <Login /> } />
            <Route path="/" render={ () => <NotFound /> } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
