import { Match, Redirect, Miss } from 'react-router';
import React from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Landing from './Landing';
import NotFound from './NotFound';
import io from 'socket.io-client';

const Main = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      isLoggedIn: false,
      user: [],
      data: [],
      parts: []
    };
  },

  getCookie() {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();

    this.setState({ parts: parts })
  },

  componentDidMount() {
    axios.get('/api/me')
      .then((res) => {
        this.setState({
          isLoggedIn: true,
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });

    const socket = io.connect('http://localhost:8080/');

    socket.on('temp', (data) => {
      console.log('Incoming Data', data);
      this.setState({ data: data.temp });
    });
  },

  updateAuth() {
    this.setState({
      isLoggedIn: true
    });
  },

  authenticateUser(email, password) {
    axios.post('api/me', { email, password })
    .then((res) => {
      this.getCookie();
      this.setState({
        isLoggedIn: true,
        playerId: res.data.id,
        user: res.data
      });
    })
    .catch((err) => {
      console.log(err);
    });
  },

  logOut() {
    console.log('Main');
    axios.get('/auth/logout')
    .then((res) => {
      this.setState({
        isLoggedIn: false,
        user: []
      })
    });
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  openModal() {
    this.setState({ showModal: true });
  },

  render() {
    console.log(this.state.user);
    return (
      <main>
        <Match
          pattern="/" exactly render={
          () => (
            <Landing
              handleLoginState={this.handleLoginState}
              closeModal={this.closeModal}
              openModal={this.openModal}
              {...this.state}
            />
          )}
        />

        <Match
          pattern="/dashboard" render={
          () => (
            this.props.isLoggedIn === false ? (
              <Redirect to="/" />
            ) : (
              <Dashboard
                handleLoginState={this.handleLoginState}
                logOut={this.logOut}
                {...this.state}
                data={this.state.data}
              />)
            )}
        />
        <Miss component={NotFound} />

      </main>
    );
  }
});

export default Main;
