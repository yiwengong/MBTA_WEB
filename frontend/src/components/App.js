import React, { Component } from 'react';

import '../styles/App.css';
import { Header } from './Header';
import { Main } from './Main';
import { USER_ID } from '../constants';


class App extends Component {
    state = {
        isLoggedIn: false,
    }

    handleLogin = (message) => {
        this.setState({ isLoggedIn: true });
        localStorage.setItem(USER_ID, message);
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false });
        localStorage.removeItem(USER_ID);
    }


    render() {
    return (
      <div className="App">
        <Header isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
