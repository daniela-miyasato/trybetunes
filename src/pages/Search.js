import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../component/Header';
import Loading from '../component/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      searchValue: '',
      isSearchButtonDisabled: true,
      searchResult: [],
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

  handleClick = async () => {
    const { search } = this.state;
    this.setState({ loading: true });
    const apiResponse = await searchAlbumsAPI(search);
    this.setState({
      loading: false,
      search: '',
      searchValue: search,
      searchResult: apiResponse,

    });
  }

  render() {
    const {
      search,
      isSearchButtonDisabled,
      loading,
      searchResult,
      searchValue,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        { loading
          ? <Loading />
          : (
            <div>
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
              <section>
                { searchResult.length > 0
                && (
                  <div>
                    <h2>{`Resultado de álbuns de: ${searchValue}`}</h2>
                    <div>
                      { searchResult.map((element) => (
                        <Link
                          key={ element.collectionId }
                          to={ `/album/${element.collectionId}` }
                          data-testid={ `link-to-album-${element.collectionId}` }
                        >
                          <p>{element.collectionName}</p>
                          <img
                            src={ element.artworkUrl100 }
                            alt={ element.collectionName }
                          />
                        </Link>
                      )) }
                    </div>
                  </div>
                )}
                { searchResult.length === 0
                && (
                  <div>
                    <h2>Nenhum álbum foi encontrado</h2>
                  </div>
                )}
              </section>
            </div>
          )}
      </div>
    );
  }
}

export default Search;
