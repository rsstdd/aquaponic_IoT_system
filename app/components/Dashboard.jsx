import React, { Component  } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Main from './Main';
import MyNav from './Nav';
import { Button, Col, Container, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Footer, Well, Row, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';
import { Gauge } from 'react-mini-chart-components';

const Dashboard = React.createClass({

  render() {
    console.log(this.props.systemStatus);
    return (
      <div className="content">
        <MyNav
          logOut={this.props.logOut}
        />

        {/* <Grid fluid={true}> */}
          <Row className="middle">
            <Col xs={3} className="water, card">
              {/* parseInt(this.props.data) */}
              <Gauge className="gauge" type='half-gauge' value={80} color='#FA6900' width='.75em' />
              <div className="box">
                <p><span className="first">0</span><span className="mid">&deg; F</span><span className="last">100</span></p>
                <div className="center-text">
                  <h4>Water Temperature: {this.props.waterTemp}&deg; F</h4>
                  <p>Optimial Tank Temperature: 78-80F</p>
                </div>
              </div>
            </Col>

            <Col xs={3} className="humid, card">
              {/* {this.props.humidity} */}
              <Gauge type='half-gauge' value={100} color='#FA6900' width='.75em' />
              <div className="box">
                <p><span className="first">0</span><span className="mid">%RH</span><span className="last">100</span></p>
                <div>
                  <h4 className="center-text">Relative Humidity: {this.props.humidity}%</h4>
                  <p className="center-more">Optimial Relative Humididty: ~90 @ 80F</p>
                </div>
              </div>
            </Col>

            <Col xs={3} className="air, card">
              {/* {this.props.airTemp} */}
              <Gauge type='half-gauge' value={70} color='#FA6900' width='.75em' />
              <div className="box">
                <p><span className="first">0</span><span className="mid">&deg; F</span><span className="last">100</span></p>
                <div className="center-text">
                  <h4> Air Temperature: {this.props.airTemp}&deg; F</h4>
                  <p>Optimial Air Temperature: 40-80</p>
                </div>
              </div>
            </Col>
          </Row>

        <Row className="user">
          <Col xs={12} className="status">
            <h4>System Status: {this.props.systemStatus}</h4>
          </Col>
        </Row>
        {/* <Footer></Footer> */}
        {/* </Grid> */}
      </div>
    );
  }
});

export default Dashboard;
