import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Register } from './Register';
import { Login } from './Login';
import { Home } from './Home';
import { History } from "./History"

export class Main extends Component {
    getLogin = () => {
        return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLogin={this.props.handleLogin}/>;
    }

    getHome = () => {
        return this.props.isLoggedIn ? <Home/> : <Redirect to="/login"/>;
    }

    getHistory = () => {
        return this.props.isLoggedIn ? <History/> : <Redirect to="/login"/>;
    }

    getRoot = () => {
        return <Redirect to="/login"/>
    }

    getRegister = () => {
        return this.props.isLoggedIn ? <Home/> : <Register handleLogin={this.props.handleLogin}/>;
    }

    render() {
        return (
            <div className="main">
                <Switch>
                    <Route exact path="/" render={this.getRoot}/>
                    <Route path="/register" render={this.getRegister}/>
                    <Route path="/login" render={this.getLogin}/>
                    <Route path="/home" render={this.getHome}/>
                    <Route path="/history" render={this.getHistory}/>
                    <Route render={this.getRoot}/>
                </Switch>
            </div>
        );
    }
}