import React, { Component } from 'react';
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
        </div>
      )
    );
  }
}

export default Header;
