import React from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Main from './Main';

const App = React.createClass({

  getInitialState() {
    return {

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

  render() {
    return (
      <BrowserRouter >
        <div>
          <Main
            isLoggedIn={this.state.isLoggedIn}
          />
        </div>
      </BrowserRouter>
    );
  }
});

export default App;
