import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    if (target.checked) {
      this.addFavorite();
    }
  };

  addFavorite = async () => {
    const { musicObj } = this.props;
    this.setState({
      loading: true,
    });
    await addSong(musicObj);
    this.setState({
      loading: false,
    });
  };

  render() {
    const { name, musicPlayer, trackId } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <p>{ name }</p>
        <audio data-testid="audio-component" src={ `${musicPlayer}` } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <br />
        {loading && <Loading />}
        <label>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="favoriteMusic"
            type="checkbox"
            name="favoriteMusic"
            onChange={ this.onInputChange }
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
