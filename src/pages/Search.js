import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    searchArtist: '',
    loading: false,
    searchResults: [],
    savedArtist: '',
  };

  handleNameChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  searchArtistOrBand = async () => {
    const { searchArtist } = this.state;
    const savedsearchArtist = searchArtist;
    this.setState({
      searchArtist: '',
      loading: true,
    });
    const searchResultsApi = await searchAlbumsAPI(savedsearchArtist);
    this.setState({
      searchArtist: '',
      loading: false,
      searchResults: searchResultsApi,
      savedArtist: savedsearchArtist,
    });
  };

  render() {
    const { searchArtist, loading, searchResults, savedArtist } = this.state;
    const minlengthSearchArtist = 2;
    return (
      (loading) ? <Loading /> : (
        <div data-testid="page-search">
          <Header />
          <h2>Search</h2>
          <fieldset>
            <legend>Pesquise uma Banda ou Artista</legend>
            <br />
            <label>
              Digite uma Banda/Artista
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
              onClick={ this.searchArtistOrBand }
              disabled={ searchArtist.length < minlengthSearchArtist }
            >
              Pesquisar
            </button>
            <p>{`Resultado de álbuns de: ${savedArtist}`}</p>
            <div>
              {
                searchResults.map((result, index) => (
                  <div key={ index }>
                    {/* <p>{`Nome do artista: ${result.artistName}`}</p>
                    <p>{`Nome do álbum: ${result.collectionName}`}</p> */}
                    <p>{result.artistName}</p>
                    <p>{result.collectionName}</p>
                    <img src={ result.artworkUrl100 } alt={ result.artistName } />
                  </div>
                ))
              }
            </div>
          </fieldset>
        </div>
      )
    );
  }
}

export default Search;
