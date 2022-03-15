import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, musicUrl } = this.props;
    return (
      <div>
        <p>
          { `Música: ${musicName}` }
        </p>
        <audio
          data-testid="audio-component"
          src={ musicUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
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
};

export default MusicCard;
