import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  };

  getUserName = async () => {
    const recoverUserName = await getUser();
    this.setState({
      userName: recoverUserName.name,
      loading: false,
    });
  };

  render() {
    const { userName, loading } = this.state;
    this.getUserName();
    return (
      (loading) ? <Loading /> : (
        <div data-testid="header-component">
          <p data-testid="header-user-name">{ userName }</p>
          <nav>
            <ul>
              <li><Link data-testid="link-to-search" to="/search">Search</Link></li>
              <li>
                <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
              </li>
              <li><Link data-testid="link-to-profile" to="/profile">Profile</Link></li>
            </ul>
          </nav>
        </div>
      )
    );
  }
}

export default Header;
