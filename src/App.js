import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Login />
          <Header />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
