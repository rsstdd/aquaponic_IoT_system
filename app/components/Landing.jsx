// import BackgroundVideo from './BackgroundVideo';
import React from 'react';
import { Button, Modal, Grid, Image, Popover, Tooltip, OverlayTrigger, Well, PageHeader, Jumbotron } from 'react-bootstrap';

const Landing = React.createClass({
  render() {
    return (
      <div>
        <Grid>
          <Jumbotron id="hero">
            <Well>
              <h1>ARDUINOPONICS</h1>
              <h2>An Automated Aquaponics System</h2>
              <p>
                <Button
                  bsSize="large"
                  // bsStyle="primary"
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
              <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Sign in With Google</h4>
              <hr />
              <Button
                onClick={this.props.signIn}
              >
                Close
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
        </Grid>
      </div>
    );
  }
});

export default Landing;
