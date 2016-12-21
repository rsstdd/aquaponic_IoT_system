import React from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Main from './Main';

const App = React.createClass({

  // getInitialState() {
  //   return {
  //     isLoggedIn: false,
  //     userId: 0
  //   };
  // },

  render() {
    return (
      <BrowserRouter >
        <div>
          <Main />
        </div>
      </BrowserRouter>
    );
  }
});

export default App;
