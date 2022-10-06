import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isChecked: false,
      favoriteList: [],
    };
  }

  // Requisição para recuperar as músicas favoritas ao entrar na página do Álbum

  componentDidMount() {
    this.getFavMusics();
  }
  // Requisição para recuperar as músicas favoritas e atualizar a lista após favoritar uma música

  getFavMusics = async () => {
    this.setState({ loading: true });
    const musicsChecked = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: musicsChecked });
    const { music } = this.props;
    const { favoriteList } = this.state;
    const isFavorite = favoriteList.find((element) => (
      element.trackName.includes(music.trackName)
    ));
    if (isFavorite) {
      this.setState({ isChecked: true });
    }
  }

  handleChange = ({ target }) => {
    const { checked } = target;
    const { update } = this.props;
    if (checked) {
      this.addFavMusic();
    } else {
      this.removeFavMusic();
    }
    update();
  }

  // Adicionar músicas na lista de músicas favoritas

  addFavMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false, isChecked: true });
  }

  // Remover músicas na lista de músicas favoritas

  removeFavMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await removeSong(music);
    this.setState({ loading: false, isChecked: false });
  }

  render() {
    const { loading, isChecked } = this.state;

    const { music: { trackName, previewUrl, trackId } } = this.props;

    // Cria a lista de músicas do álbum selecionado
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

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string,
    previewUrl: PropTypes.string,
    trackId: PropTypes.number,
  }),
  update: PropTypes.func,
}.isRequired;

export default MusicCard;
