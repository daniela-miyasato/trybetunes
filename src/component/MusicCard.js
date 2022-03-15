import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicTrackId, musicName, musicUrl } = this.props;
    return (
      <div key={ musicTrackId }>
        <p>
          { musicName }
        </p>
        <audio
          data-testid="audio-component"
          src={ musicUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  musicUrl: PropTypes.string.isRequired,
  musicTrackId: PropTypes.number.isRequired,
};

export default MusicCard;
