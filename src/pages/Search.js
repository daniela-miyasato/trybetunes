import React from 'react';
import Header from '../component/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isSearchButtonDisabled: true,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validate());
  }

  validate = () => {
    const { search } = this.state;
    const minCharacteres = 2;

    if (search.length >= minCharacteres) {
      this.setState({ isSearchButtonDisabled: false });
    } else {
      this.setState({ isSearchButtonDisabled: true });
    }
  }

  render() {
    const { search, isSearchButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        <form>
          <input
            data-testid="search-artist-input"
            id="search"
            name="search"
            type="text"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            data-testid="search-artist-button"
            name="btnSearch"
            type="submit"
            disabled={ isSearchButtonDisabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
