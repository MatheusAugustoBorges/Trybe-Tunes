import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

class Album extends Component {
  state = {
    infos: [],
    getMusicsResultsAPI: [],
  };

  componentDidMount() {
    this.getId();
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
    const { getMusicsResultsAPI } = this.state;
    getMusicsResultsAPI.map((music) => music.trackId === Number(name)
      && this.setState(
        {
          loading: true,
        },
        async () => {
          await addSong(music);
          this.setState({
            loading: false,
          });
        },
      ));
  };

  getId = async () => {
    const { match: {
      params: { id },
    } } = this.props;
    const getMusicsResults = await getMusics(id);
    const musics = getMusicsResults.filter((_music, index) => index !== 0);
    this.setState({
      infos: getMusicsResults[0],
      getMusicsResultsAPI: musics,
    });
  };

  render() {
    const { infos, getMusicsResultsAPI, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {(loading) && <Loading />}
        <h2>Artist</h2>
        <p data-testid="artist-name">{infos.artistName}</p>
        <h2>Album</h2>
        <p data-testid="album-name">{infos.collectionName}</p>
        <h2>Musics</h2>
        {
          getMusicsResultsAPI.map((music, index) => (
            <MusicCard
              key={ index }
              name={ music.trackName }
              music={ music.previewUrl }
              trackId={ music.trackId }
              onInputChange={ this.onInputChange }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
