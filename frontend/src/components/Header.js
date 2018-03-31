import React, { Component } from 'react';
import { Icon } from 'antd';
import logo from '../assets/logo.svg';

export class Header extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">MBTA-Ticket</h1>
                    {
                        this.props.isLoggedIn ?
                            <a className="logout"
                               onClick={this.props.handleLogout}
                            >
                                <Icon type="logout" />{' '}Logout
                            </a> : null
                    }
                </header>
            </div>
        );
    }
}

