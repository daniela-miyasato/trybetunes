import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../component/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../component/Header';
import FavoriteMusics from '../component/FavoriteMusics';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      favoriteList: [],
    };
  }

  // 12 - Crie a lista de músicas favoritas

  componentDidMount() {
    this.getFavMusicsUpdated();
  }

  getFavMusicsUpdated = async () => {
    this.setState({ loading: true });
    const musicsChecked = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: musicsChecked });
  }

  render() {
    const { loading, favoriteList } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        <h1>Favorites</h1>

        { loading
          ? <Loading />
          : (
            <div>
              { favoriteList.map((element) => (
                <FavoriteMusics
                  key={ element.trackId }
                  music={ element }
                  update={ this.getFavMusicsUpdated } // Será validado se a lista de músicas favoritas é atualizada ao remover uma música da lista. (Req.12)
                  // passei por props a função de atualizar a lista, tentei colocar a função direto no componente, mas dá errado.
                />
              ))}
            </div>
          )}
      </div>
    );
  }
}

Favorites.propTypes = {
  music: PropTypes.shape(),
}.isRequired;

export default Favorites;
