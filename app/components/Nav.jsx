import React, { Component  } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Main from './Main';
import { Nav, NavItem, Navbar } from 'react-bootstrap';

const MyNav = React.createClass({

  handleLogOut() {
    console.log('hello');
    this.props.logOut();
  },

  render() {
    return (
      <div>
        <Navbar id="nav">
            <Navbar.Header>
              <Navbar.Brand>
                <h1><span id="white">ARDUINOPONICS</span> <span id="orange">|</span> dashboard</h1>
              </Navbar.Brand>
            </Navbar.Header>
          <Nav pullRight>
            <NavItem eventKey={1} href="/" onClick={this.handleLogOut}>Log Out</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
});

export default MyNav;
