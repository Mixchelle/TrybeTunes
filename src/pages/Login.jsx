import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../img/logo.png';
import '../style/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      redirect: false,
    };
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
      <div data-testid="page-login" className="login-container">
        <div className="login-content">
          {loading ? (
            <Loading loading={ loading } />
          ) : (
            <Form>
              <img src={ logo } alt="Logo" />
              <Form.Group>
                <Form.Label htmlFor="login-name-input">
                  Name:
                  <Form.Control
                    id="login-name-input"
                    data-testid="login-name-input"
                    placeholder="Digite seu nome"
                    name="name"
                    type="text"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </Form.Label>
              </Form.Group>
              <Button
                type="submit"
                data-testid="login-submit-button"
                onClick={ this.handleClick }
                disabled={ buttonDisabled }
                className="login-button"
              >
                Entrar
              </Button>
            </Form>
          )}
          {redirect && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}

export default Login;
