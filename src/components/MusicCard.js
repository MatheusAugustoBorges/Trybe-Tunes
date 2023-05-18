import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    loadingChecks: false,
    favoriteMusicsRecover: [],
  };

  componentDidMount() {
    this.getFavoriteMusics();
  }

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

  getFavoriteMusics = async () => {
    this.setState({
      loadingChecks: true,
    });
    const favoriteMusicsStorage = await getFavoriteSongs();
    this.setState({
      loadingChecks: false,
      favoriteMusicsRecover: favoriteMusicsStorage,
    });
  };

  render() {
    const { name, musicPlayer, trackId } = this.props;
    const { loading, loadingChecks, favoriteMusicsRecover } = this.state;
    return (
      (loadingChecks) ? <Loading /> : (
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
              checked={ favoriteMusicsRecover
                .some((musicStorage) => trackId === musicStorage.trackId) }
              onChange={ this.onInputChange }
            />
          </label>
        </div>
      )
    );
  }
}

MusicCard.propTypes = {
  name: PropTypes.string,
}.isRequired;

export default MusicCard;
