import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    infos: [],
    getMusicsResultsAPI: [],
  };

  componentDidMount() {
    this.getId();
  }

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
    const { infos, getMusicsResultsAPI } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h2>Artist</h2>
        <p data-testid="artist-name">{infos.artistName}</p>
        <h2>Album</h2>
        <p data-testid="album-name">{infos.collectionName}</p>
        <h2>Musics</h2>
        {
          getMusicsResultsAPI.map((music, index) => (
            <MusicCard
              key={ index }
              musicObj={ music }
              name={ music.trackName }
              musicPlayer={ music.previewUrl }
              trackId={ music.trackId }
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
