import { Match, Redirect } from 'react-router';
import React from 'react';
import axios from 'axios';
import Dashboard from './Dashboard';
import Landing from './Landing';
import io from 'socket.io-client';

const Main = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      isLoggedIn: false,
      user: [],
      data: []
    };
  },

  componentDidMount() {
    axios.get('/api/me')
      .then((res) => {
        this.setState({
          isLoggedIn: true,
          user: res.data
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });

    const socket = io.connect('http://localhost:8080/');

    socket.on('temp', (data) => {
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
    console.log(this.state.data);
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
                user={this.state.user}
                data={this.state.data}
              />)
            )}
        />

      </main>
    );
  }
});

export default Main;
