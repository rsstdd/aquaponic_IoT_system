import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Match, Link, Redirect, BrowserRouter } from 'react-router';

const Main = React.createClass({

  getInitialState() {
    return {
      // videoURL: 'https://vimeo.com/2691349'
      videoURL: 'https://pixabay.com/en/videos/aquarium-fish-marine-underwater-6636'
    };
  },

  render() {
    console.log(this.state.videoURL);

    return (
      <main>

        <Match
          pattern="/" exactly render={
          () => (
            <div>
              <article>
                <h1> ROSS M TODD DESIGN co.</h1>
              </article>
              <video id="video" autoPlay loop muted>
                <source src={this.state.videoURL} type="video/mp4" />
              </video>
            </div>
          )}
        />
      </main>
    );
  }
});

export default Main;
