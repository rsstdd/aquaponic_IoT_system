import React from 'react';
import { Button, Col, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, PageHeader, Jumbotron } from 'react-bootstrap';

const Landing = React.createClass({

  handleLogin() {
    window.location.href='auth/google';
  },

  render() {
    return (
      <div>
        <Grid fluid={true}>
          <Col>
            <Jumbotron id="hero">
              <Well>
                <h1>ARDUINOPONICS</h1>
                <h2>An Automated Aquaponics System</h2>
                <p>
                  <Button
                    bsSize="large"
                    className="hero-btn"
                    onClick={this.props.openModal}
                  >
                    Log In
                  </Button>
                </p>
              </Well>
            </Jumbotron>
            <Modal
              show={this.props.showModal}
              onHide={this.close}
            >
              <Modal.Header closeButton>
                <Modal.Title>Sign in With Google</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4></h4>
                <hr />
                <Button
                  onClick={this.handleLogin}
                >
                  Log In
                </Button>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={this.props.closeModal}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Grid>
      </div>
    );
  }
});

export default Landing;
