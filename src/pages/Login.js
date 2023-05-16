import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

class Login extends Component {
  state = {
    userName: '',
    loading: false,
  };

  handleNameChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  savingUserName = async (event) => {
    const { history } = this.props;
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const { userName } = this.state;
    await createUser({ name: userName });
    history.push('/search');
  };

  render() {
    const { userName, loading } = this.state;
    const minlengthName = 3;
    const loadingElement = <span>Carregando...</span>;

    return (
      (loading) ? loadingElement : (
        <div data-testid="page-login">
          <h2>Login</h2>
          <fieldset>
            <legend>Nome do Usuário</legend>
            <br />
            <label>
              Nome
              <input
                data-testid="login-name-input"
                id="userName"
                type="text"
                name="userName"
                value={ userName }
                onChange={ this.handleNameChange }
              />
            </label>
            <br />
            <br />
            <button
              data-testid="login-submit-button"
              id="access"
              type="submit"
              name="access"
              onClick={ this.savingUserName }
              disabled={ userName.length < minlengthName }
            >
              Entrar
            </button>
          </fieldset>
        </div>
      )
    );
  }
}

export default Login;
