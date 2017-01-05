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

        <Grid fluid={true}>
          <Row className="middle">
            <Col xs={4} className="water">
              {/* parseInt(this.props.data) */}
              <Gauge type='half-gauge' value={66} color='#FA6900' width='.5em' />
              <p><span className="first">0</span><span className="mid">&deg; F</span><span className="last">100</span></p>
              <h4 className="center-text">Water Temperature:{this.props.data} 90&deg; F</h4>
            </Col>

            <Col xs={4} className="humid">
              <Gauge type='half-gauge' value={33} color='#FA6900' width='.5em' />
              <p><span className="first">0</span><span className="mid">%RH</span><span className="last">100</span></p>
              <h4 className="center-text">Relative Humidity: 90 %</h4>
            </Col>

            <Col xs={4} className="air">
              <Gauge type='half-gauge' value={90} color='#FA6900' width='.5em' />
              <p><span className="first">0</span><span className="mid">&deg; F</span><span className="last">100</span></p>
              <h4 className="center-more"> Air Temp: 90&deg; F</h4>
            </Col>
          </Row>
          <Row>
            <Col xs={4} className="sub-center-text">
              <p>Optimial Tank Temperature: 78-80F</p>
            </Col>

            <Col xs={4} className="sub-center-text">
              <p>Optimial Relative Humididty: ~90 @ 80F</p>
            </Col>

            <Col xs={4} className="sub-center-text-more">
              <p>Optimial Air Temperature: 40-80</p>
            </Col>
          </Row>

          <Row className="bottom, user">
            <Col xs={12} className="user">
              <h4>System Status: Ok</h4>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

export default Dashboard;
