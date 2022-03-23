import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class FavoriteMusics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isChecked: true,
      favoriteList: [],
    };
  }

  componentDidMount() {
    this.getFavMusicsUpdated();
  }

  getFavMusicsUpdated = async () => {
    this.setState({ loading: true });
    const musicsChecked = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: musicsChecked });
    const { favoriteList } = this.state;
    console.log(favoriteList);
  }

  handleChange = async ({ target }) => {
    const { checked } = target;
    // const { update } = this.props;
    if (!checked) {
      this.removeFavMusic();
    }
    const musicsChecked = await getFavoriteSongs();
    this.setState({ favoriteList: musicsChecked });
  }

  // 11 - Crie o mecanismo para remover músicas na lista de músicas favoritas

  removeFavMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await removeSong(music);
    this.setState({ loading: false, isChecked: false });
  };

  render() {
    const { loading, isChecked } = this.state;

    const { music: { trackName, previewUrl, trackId } } = this.props;

    // 7. Crie a lista de músicas do álbum selecionado
    // Tag <audio> foi passada no requisito
    return (
      <div>
        <p>
          { trackName }
        </p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        { loading
          ? <Loading />
          : (
            <label htmlFor="favorite">
              <input
                data-testid={ `checkbox-music-${trackId}` }
                id="favorite"
                name="favorite"
                type="checkbox"
                checked={ isChecked }
                onChange={ this.handleChange }
              />
              Favorita
            </label>
          )}
      </div>
    );
  }
}

FavoriteMusics.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }),
  update: PropTypes.func,
}.isRequired;

export default FavoriteMusics;
