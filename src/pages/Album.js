import React from 'react';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../component/Loading';
import MusicCard from '../component/MusicCard';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      album: [],
    };
  }

  // 7. Crie a lista de músicas do álbum selecionado

  componentDidMount() {
    this.getListMusic();
  }

  getListMusic = async () => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    const list = await getMusics(id);
    this.setState({ album: list, loading: false });
    console.log(list);
  }

  render() {
    const {
      loading,
      album,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>

        { loading
          && <Loading /> }

        { album.length > 0
          && (
            <div>
              <section>
                <img
                  src={ album[0].artworkUrl100 }
                  alt={ album[0].collectionName }
                />
                <h3 data-testid="artist-name">
                  { `Artista / Banda: ${album[0].artistName}` }
                </h3>
                <h3 data-testid="album-name">
                  { `Álbum: ${album[0].collectionName}` }
                </h3>
              </section>
              <section>
                {/* index !== 0, pq o primeiro objeto não é música. */}
                {album.map((element, index) => (
                  index !== 0
                  && (
                    <MusicCard
                      key={ element.trackId }
                      music={ element }
                    // musicTrackId={ element.trackId }
                    // musicName={ element.trackName }
                    // musicUrl={ element.previewUrl }
                    />
                  )
                ))}
              </section>

            </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
