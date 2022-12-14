import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../component/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isEnterButtonDisabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const { name } = this.state;
    const minCharacteres = 3;

    if (name.length >= minCharacteres) {
      this.setState({ isEnterButtonDisabled: false });
    } else {
      this.setState({ isEnterButtonDisabled: true });
    }
  }

  handleClick = async () => {
    const { name } = this.state;
    this.setState({ loading: true });
    await createUser({
      name,
      email: 'dani@trybe.com',
      description: 'to testando pra ver se passa',
      image: 'https://conteudo.imguol.com.br/blogs/174/files/2018/05/iStock-648229868.jpg',
    });
    this.setState({ loading: false, redirect: true });
  }

  render() {
    const {
      name,
      isEnterButtonDisabled,
      loading,
      redirect,
    } = this.state;

    return (
      <div data-testid="page-login">
        Login
        { loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="name">
                Nome
                <input
                  id="name"
                  name="name"
                  type="text"
                  data-testid="login-name-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                data-testid="login-submit-button"
                name="btnEnter"
                type="submit"
                disabled={ isEnterButtonDisabled }
                onClick={ this.handleClick }
              >
                Entrar

              </button>
              { redirect && <Redirect to="/search" /> }
            </form>
          )}
      </div>
    );
  }
}

export default Login;
