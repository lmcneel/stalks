/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Row, Container, Button, Modal, ModalHeader, ModalFooter, Col, Form, FormGroup, Label, Input, ModalBody } from 'reactstrap';

class RadioYesNo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "Was this helpful?",
      showRadio: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  changeTitle = () => {
    this.setState({ title: "Thank You for your Feedback!" });
    this.setState({ showRadio: false });
 };


  render() {
    return (
      <div>
        <Container>
          <Row className="d-flex justify-content-center">
            <Form inline>
              <h3>{this.state.title}</h3>
              {this.state.showRadio ? 
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="radio1" onClick={this.changeTitle} />
                  Yes
              </Label>
              </FormGroup> : null }
              {this.state.showRadio ? 
              <FormGroup check>
                <Label check>
                  <Input onClick={this.toggle} type="radio" name="radio1" />
                  No
              </Label>
              </FormGroup> : null }
            </Form>
          </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>

Please visit our forum to get more customized assitance with your problems. 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Visit the Forum</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RadioYesNo;