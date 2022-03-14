import React from 'react';
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

  // componentDidMount - dispara uma ou mais ações após o componente ser inserido no DOM (ideal para requisições)
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
            <p data-testid="header-user-name">
              { `Olá, ${name}` }
            </p>
          )}
      </header>
    );
  }
}

export default Header;
