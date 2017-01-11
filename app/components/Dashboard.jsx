import React, { Component  } from 'react';
import { BrowserRouter } from 'react-router';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Main from './Main';
import MyNav from './Nav';
import { Button, Col, Container, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Footer, Well, Row, PageHeader, Jumbotron, Navbar } from 'react-bootstrap';
import { Gauge } from 'react-mini-chart-components';

const Dashboard = React.createClass({
  getInitialState() {
    return {
      systemStatus: '',
      textColor: '',
      airColor: ''
    };
  },

  componentDidMount() {
    setInterval(() => {
      if (this.props.waterTemp >= 70 && this.props.waterTemp <= 80) {
        this.setState({ systemStatus: 'Ok' });
        this.setState({ waterColor: '#FA6900' });
      } else if (this.props.waterTemp <= 60 || this.props.waterTemp >= 80) {
        this.setState({ systemStatus: 'Alert' });
        this.setState({ waterColor: '#990000' });
      }

      if (this.props.airTemp >= 60 && this.props.airTemp <= 80) {
        this.setState({ airColor: '#FA6900' });
      } else if (this.props.airTemp <= 60 || this.props.airTemp >= 80) {
        this.setState({ airColor: '#990000' });
      }

      this.state.systemStatus === 'Alert' ?  this.setState({ textColor: 'red' }): this.setState({ textColor: 'green' });
    }, 500);
  },

  render() {
    console.log(this.state.systemStatus);
    return (
      <div className="content">
        <MyNav
          logOut={this.props.logOut}
        />

          <Row className="middle">
            <Col xs={3} className="water, card">
              {/* parseInt(this.props.waterTemp) */}
              <Gauge className="gauge" type='half-gauge' value={parseInt(this.props.waterTemp)} color={this.state.waterColor} width='1em' />
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
              <Gauge type='half-gauge' value={parseInt(this.props.humidity)} color="#FA6900" width='1em' />
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
              <Gauge type='half-gauge' value={parseInt(this.props.airTemp)} color={this.state.airColor} width='1em' />
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
            <h3>System Status: <span className={this.state.textColor}>{this.state.systemStatus}</span></h3>
          </Col>
        </Row>
      </div>
    );
  }
});

export default Dashboard;
