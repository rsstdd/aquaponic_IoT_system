import React, { Component  } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Main from './Main';
import MyNav from './Nav';
import { Button, Col, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';
import { Gauge } from 'react-mini-chart-components';

const Dashboard = React.createClass({

  render() {
    return (
      <div>
        <MyNav
          logOut={this.props.logOut}
        />
        <Grid fluid={true}>

          <Col  xs={4}>
            <Gauge type='half-gauge' value={80} color='#FA6900' width='.1em' />
            <h5>Air Temp</h5>
          </Col>

          <Col  xs={4}>
            <Gauge type='half-gauge' value={33} color='#FA6900' width='.1em' />
            <h5 className="center">Relative Humidity</h5>
          </Col>

          <Col xs={4}>
            <Gauge type='half-gauge' value={90} color='#FA6900' width='.1em' />
            <h5>Air Temp</h5>
          </Col>

        </Grid>
      </div>
    );
  }
});

export default Dashboard;
