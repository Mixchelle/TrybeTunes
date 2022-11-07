import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      redirect: false };
  }

  handleClick = () => {
    const { name } = this.state;
    this.setState({ loading: true });
    createUser({ name })
      .then(() => {
        this.setState({ loading: false, redirect: true });
      });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const minCaracteres = 3;
    this.setState({ [name]: value });
    if (name === 'name') {
      this.setState({
        buttonDisabled: value.length < minCaracteres,
      });
    }
  };

  render() {
    const { name, buttonDisabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login" className="login">
        <h1>Login</h1>
        {loading ? (
          <Loading loading={ loading } />
        ) : (
          <form>
            <label htmlFor="login-name-input">
              Nome:
              <input
                id="login-name-input"
                data-testid="login-name-input"
                placeholder="Digite seu nome"
                name="name"
                type="text"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              onClick={ this.handleClick }
              disabled={ buttonDisabled }
            >
              Entrar
            </button>
          </form>
        )}
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
