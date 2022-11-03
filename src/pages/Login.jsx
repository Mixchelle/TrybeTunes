import React from 'react';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisabled: true };
  }

  handleClick = (submit) => {
    createUser({ name: 'Nome digitado' }).then(() => {
      submit();
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
    const { name, buttonDisabled } = this.state;
    return (
      <div data-testid="page-login">
        <form action="">
          <label htmlFor="login-name-input">
            Nome:
            <input
              id="login-name-input"
              data-testid="login-name-input"
              name="name"
              type="text"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="login-submit-button"
            onClick={ () => {
              this.handleClick(submit);
            } }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
