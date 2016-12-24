import React from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Main from './Main';
import { Button, Col, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';

const Dashboard = React.createClass({

  render() {
    return (
      <div>
        <Navbar id="nav">
          <Navbar.Header>
            <Navbar.Brand>
              <h1>ARDUINOPONICS <span id="orange">|</span> <span id="white">dashboard</span></h1>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <h1>Hello World</h1>
      </div>
    );
  }
});

export default Dashboard;
