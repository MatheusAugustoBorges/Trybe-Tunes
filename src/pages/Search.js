import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchArtist: '',
  };

  handleNameChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { searchArtist } = this.state;
    const minlengthSearchArtist = 2;
    return (
      <div data-testid="page-search">
        <Header />
        <h2>Search</h2>
        <fieldset>
          <legend>Pesquise uma Banda ou Artista</legend>
          <br />
          <label>
            Digite Banda/Artista
            <input
              data-testid="search-artist-input"
              id="searchArtist"
              type="text"
              name="searchArtist"
              value={ searchArtist }
              onChange={ this.handleNameChange }
            />
          </label>
          <br />
          <br />
          <button
            data-testid="search-artist-button"
            id="searchArtistBtn"
            type="submit"
            name="searchArtistBtn"
            // onClick={ }
            disabled={ searchArtist.length < minlengthSearchArtist }
          >
            Pesquisar
          </button>
        </fieldset>
      </div>
    );
  }
}

export default Search;
