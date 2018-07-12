
/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React from 'react';
import {Row, Container, Button, Modal, ModalFooter, Form, FormGroup, Label, Input, ModalBody} from 'reactstrap';
import {Link} from 'react-router-dom';
import API from '../../utils/API';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  article: PropTypes.array,
  helpfulYes: PropTypes.number,
  helpfulNo: PropTypes.number,
};
/**
 * DocsList class
 */
class RadioYesNo extends React.Component {
  /**
 * Constructor method for radioyesno
 * @param {*} props
 */
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: 'Was this helpful?',
      showRadio: true,
    };

    this.changeTitle = this.changeTitle.bind(this);
    this.toggle = this.toggle.bind(this);
    // this.updateDoc = this.updateDoc.bind(this);
  }
  /**
  * updateDoc function
  * @param {bool} YesNo
  */
  updateDoc(YesNo) {
    let yes = this.props.helpfulYes;
    let no = this.props.helpfulNo; 
     console.log(typeof this.props.helpfulYes);
    if (YesNo) {
      yes+=1;
      console.log('YES!');
    
    }
    else {
      no+=1;
      console.log('NO!');
    };

    API.updateDoc({id: this.props.id, helpfulYes: yes, helpfulNo: no});
  }
  /**
  * toggle modal function
  */
  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }
  /**
  * change title function
  */
  changeTitle() {
    this.setState({title: 'Thank You for your Feedback!'});
    this.setState({showRadio: false});
  };
   /**
  * Render function
  * @return {JSX}
  */
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
                  <Input onClick={(event) => {this.changeTitle(); this.updateDoc(true)}} type="radio" name="radio1" />
                    Yes
              </Label>
                </FormGroup> : null}
              {this.state.showRadio ?
                <FormGroup check>
                  <Label check>
                    <Input onClick={(event) => {this.toggle(); this.updateDoc(false)}} type="radio" name="radio1" />
                    No
              </Label>
                </FormGroup> : null}
            </Form>
          </Row>
        </Container>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalBody>
            Please visit our forum to get more customized assitance with your problems.
          </ModalBody>
          <ModalFooter>
            <Link to={'/petfolio'}><Button color="primary" onClick={this.toggle}>Visit the Forum</Button></Link>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

RadioYesNo.propTypes = propTypes;
export default RadioYesNo;
