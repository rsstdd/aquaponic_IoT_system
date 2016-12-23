import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Match, Link, Redirect, BrowserRouter } from 'react-router';
import Landing from './Landing';

const Main = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      isLoggedIn: false,
      user: []
    };
  },

  componentDidMount() {
    axios.get('/api/me') // isLoggedIn then user info
      .then((res) => {
        console.log(res);
        this.setState({
          isLoggedIn: true,
          user: res.data
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });
  },

  authenticateUser(email, password) {
    axios.post('api/token', { email, password })
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
    this.setState({
      isLoggedIn: false,
      user: []
    });
  },

  closeModal() {
    this.setState({ showModal: false });
  },

  openModal() {
    this.setState({ showModal: true });
  },

  render() {
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
                {...this.state}
              />)
            )}
        />

      </main>
    );
  }
});

export default Main;
