import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Match, Link, Redirect, BrowserRouter } from 'react-router';
import Landing from './Landing'
// import BackgroundVideo from './BackgroundVideo'
const Main = React.createClass({

  getInitialState() {
    return {
      videoURL: 'https://pixabay.com/en/videos/aquarium-fish-marine-underwater-6636',
      showModal: false,
      isLoggedIn: false,
      userId: 0
    };
  },

  // componentDidMount() {
  //   axios.get('/api/me') // isLoggedIn then user info
  //     .then((res) => {
  //       this.setState({
  //         isLoggedIn: true,
  //         playerId: res.data.id,
  //         user: res.data
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       this.setState({ isLoggedIn: false });
  //     });
  // },

  // authenticateUser(email, password) {
  //   axios.post('api/token', { email, password })
  //   .then((res) => {
  //     this.setState({
  //       isLoggedIn: true,
  //       playerId: res.data.id,
  //       user: res.data
  //     });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // },

  logOut() {
    this.setState({
      isLoggedIn: false
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
              closeModal={this.closeModal}
              openModal={this.openModal}
              {...this.state}
            />
          )}
        />
      </main>
    );
  }
});

export default Main;
