import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    // console.log(searchResultsApi);
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
            <div>
              {
                (searchResults.length === 0)
                  ? <p>Nenhum álbum foi encontrado</p>
                  : (
                    <div>
                      <p>{`Resultado de álbuns de: ${savedArtist}`}</p>
                      {
                        searchResults.map((result, index) => (
                          <div key={ index }>
                            <br />
                            <Link
                              data-testid={ `link-to-album-${result.collectionId}` }
                              to={ `/album/${result.collectionId}` }
                            >
                              <img
                                src={ result.artworkUrl100 }
                                alt={ result.artistName }
                              />
                              <p>{result.artistName}</p>
                              <p>{result.collectionName}</p>
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  )
              }
            </div>
          </fieldset>
        </div>
      )
    );
  }
}

export default Search;
