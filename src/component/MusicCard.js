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

  componentDidMount() {
    this.favMusics();
  }

  favMusics = async () => {
    this.setState({ loading: true });
    const musicsSaved = await getFavoriteSongs();
    this.setState({ loading: false, favoriteList: musicsSaved });
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
    if (checked) {
      this.addFavMusic();
    } else {
      this.removeFavMusic();
    }
  }

  addFavMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await addSong(music);
    this.setState({ loading: false, isChecked: true });
  }

  removeFavMusic = async () => {
    const { music } = this.props;
    this.setState({ loading: true });
    await removeSong(music);
    this.setState({ loading: false, isChecked: false });
  }

  render() {
    const { loading, isChecked } = this.state;

    const { music: { trackName, previewUrl, trackId } } = this.props;

    return (
      <div key={ trackId }>
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
}.isRequired;

export default MusicCard;
