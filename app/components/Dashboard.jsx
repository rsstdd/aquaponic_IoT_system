import React, { Component  } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Main from './Main';
import MyNav from './Nav';
import { Button, Col, Container, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, Row, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';
import { Gauge } from 'react-mini-chart-components';

const Dashboard = React.createClass({

  render() {
    return (
      <div>
        <MyNav
          logOut={this.props.logOut}
        />


        <Grid fluid={false}>
          <Row>
            <Col lg={3} className="user">
              <Image src={this.props.user.avatarUrl} responsive circle />
              <p>Hello, {this.props.user.name}</p>
              <h5>System Status: Ok</h5>
            </Col>
            <Col lg={3} className="water">
              {/* parseInt(this.props.data) */}
              {/* <Gauge type='half-gauge' value={66} color='#FA6900' width='.5em' /> */}
              <h5>Water Temperature: {this.props.data} </h5>
            </Col>

            <Col lg={3} className="humid">
              {/* <Gauge type='half-gauge' value={33} color='#FA6900' width='.5em' /> */}
              <h5 >Relative Humidity:</h5>
            </Col>

            <Col lg={3} className="air">
              {/* <Gauge type='half-gauge' value={90} color='#FA6900' width='.5em' /> */}
              <h5>Air Temp:</h5>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

export default Dashboard;
