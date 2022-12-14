import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      name: '',
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    const userName = userInfo.name;
    this.setState({ loading: false, name: userName });
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <h1> HEADER</h1>
        {loading
          ? <Loading />
          : (
            <div>
              <p data-testid="header-user-name">
                <h1>
                  Olá,
                  <span>{name}</span>
                </h1>
              </p>
              <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </div>
          )}
      </header>
    );
  }
}

export default Header;
