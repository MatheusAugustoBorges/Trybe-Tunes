import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { name, music, trackId } = this.props;
    return (
      <div>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ `${music}` } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <br />
        <label>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="favoriteMusic"
            type="checkbox"
            name="favoriteMusic"
            // onChange={ onInputChange }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default MusicCard;
