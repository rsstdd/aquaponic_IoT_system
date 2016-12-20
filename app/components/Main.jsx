import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Match, Link, Redirect, BrowserRouter } from 'react-router';
import { Button, Col, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, wellStyles, PageHeader } from 'react-bootstrap';

const Main = React.createClass({

  getInitialState() {
    return {
      videoURL: 'https://pixabay.com/en/videos/aquarium-fish-marine-underwater-6636',
      showModal: false
    };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <main>

        <Match
          pattern="/" exactly render={
          () => (
            <Grid>
              <article>
                <Col xs={12} md={9}>
                  <Image src="/assets/images/fish-logo.gif" responsive />
                </Col>
                <Col xs={12} md={9}>
                  <PageHeader>ARDUINOPONICS<br />
                    <small>An Automated Aquaponics System</small>
                  </PageHeader>
                  <Col
                    xs={12}
                    md={4}
                    >
                      <div className="well" style={wellStyles}>

                      <Button
                        block
                        bsStyle="primary"
                        bsSize="large"
                        onClick={this.open}
                        >
                          Login
                      </Button>
                    <Modal show={this.state.showModal} onHide={this.close}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <hr />
                      </Modal.Body>
                      <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </Col>
                </Col>
              </article>
              <video id="video" autoPlay loop muted>
                <source src={this.state.videoURL} type="video/mp4" />
              </video>
            </Grid>
          )}
        />
      </main>
    );
  }
});

export default Main;
