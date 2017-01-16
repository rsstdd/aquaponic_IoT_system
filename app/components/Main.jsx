import { Match, Miss, Redirect } from 'react-router';
import axios from 'axios';
import Dashboard from './Dashboard';
import io from 'socket.io-client';
import Landing from './Landing';
import NotFound from './NotFound';
import React from 'react';

const Main = React.createClass({

  getInitialState() {
    return {
      showModal: false,
      isLoggedIn: false,
      waterTemp: [],
      data: [],
      airTemp: [],
      humidity: [],
      parts: [],
      color: '#FA6900',
      textColor: '',
      systemStatus: '',
      airColor: ''
    };
  },

  componentDidMount() {
    axios.get('/api/me')
      .then((res) => {
        this.setState({
          isLoggedIn: true
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoggedIn: false });
      });

    const socket = io.connect('http://localhost:8080/');

    socket.on('waterTemp', (data) => {
      this.setState({ waterTemp: data.waterTemp });

      if (this.props.waterTemp >= 70 && this.props.waterTemp <= 80) {
        this.setState({ systemStatus: 'Ok', waterColor: '#FA6900' });
      } else if (this.props.waterTemp <= 60 || this.props.waterTemp >= 80) {
        this.setState({ systemStatus: 'Alert', waterColor: '#990000' });
      }
    });

    socket.on('airTemp', (data) => {
      this.setState({ airTemp: data.airTemp });

      if (this.props.airTemp >= 60 && this.props.airTemp <= 80) {
        this.setState({ airColor: '#FA6900' });
      } else if (this.props.airTemp <= 60 || this.props.airTemp >= 80) {
        this.setState({ airColor: '#990000' });
      }
    });

    socket.on('humidity', (data) => {
      this.setState({ humidity: data.humidity });
    });

    this.state.systemStatus === 'Alert' ?  this.setState({ textColor: 'red' }) : this.setState({ textColor: 'green' });
  },

  updateAuth() {
    this.setState({
      isLoggedIn: true
    });
  },

  logOut() {
    axios.get('/auth/logout')
    .then((res) => {
      this.setState({
        isLoggedIn: false,
        user: []
      });
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
                logOut={this.logOut}
                getStatus={this.getStatus}
                {...this.state}
              />)
            )}
        />
        <Miss component={NotFound} />

      </main>
    );
  }
});

export default Main;
