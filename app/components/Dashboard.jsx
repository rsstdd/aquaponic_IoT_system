import React, { Component  } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Main from './Main';
import MyNav from './Nav';
import { Button, Col, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, Row, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';
import { Gauge } from 'react-mini-chart-components';

const Dashboard = React.createClass({

  render() {
    return (
      <div>
        <MyNav
          logOut={this.props.logOut}
        />

        <Grid fluid={true}>

          <Row>
            <Col xs={12} md={6} lg={4}>
              <h5>System Status: Ok</h5>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Gauge type='half-gauge' value={parseInt(this.props.data)} color='#FA6900' width='.5em' />
              <h5>Air Temp: {this.props.data} </h5>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Gauge type='half-gauge' value={33} color='#FA6900' width='.5em' />
              <h5 className="center">Relative Humidity:</h5>
            </Col>

            <Col xs={12} md={6} lg={4}>
              <Gauge type='half-gauge' value={90} color='#FA6900' width='.5em' />
              <h5>Air Temp:</h5>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
});

export default Dashboard;
