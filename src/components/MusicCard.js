import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MusicCard extends Component {
  render() {
    const { name, music } = this.props;
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
      </div>
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default MusicCard;
