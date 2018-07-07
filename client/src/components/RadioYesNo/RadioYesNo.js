import React, { Component } from 'react';
import { Row, Container, Button, Col, Form, FormGroup, Label, Modal, Input, FormText } from 'reactstrap';
import GoToForumModal from '../GoToForumModal/index';

export default class RadioYesNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Form inline>
              <h3>Was this helpful?</h3>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" onClick={this.toggleModal} />{' '}
                  Yes
              </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input onClick={this.toggleModal} type="radio" name="radio1" />{' '}
                  No
              </Label>
              </FormGroup>
          </Form>
          <GoToForumModal show={this.state.isOpen}
          onClose={this.toggleModal}>
          Here's some content for the modal
        </GoToForumModal>
        </Row>
      </Container>
    );
  }
}
