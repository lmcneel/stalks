
import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, Container, Row, Col} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/fontawesome-free-solid';


/**
 * Collapse row class
 */
class CollapseRow extends Component {
  /**
   * Constructor method for collapse row
   * @param {*} props
   */
 constructor(props) {
   super(props);
   this.toggle = this.toggle.bind(this);
   this.state = {collapse: false};
 }

  /**
   * Toggle function
   */
 toggle() {
   this.setState({collapse: !this.state.collapse});
 }

/**
 * Render function
 * @return {JSX}
 */
 render() {
   return (
       <Container>
        <Row>
          <Col>
            <h1>Pets Help Center</h1>
          </Col>
          <Col>
            <Button
                color="primary"
                className="buttonCol mb-3"
                onClick={this.toggle}>
                  <FontAwesomeIcon
                    icon={faPlus} />
              </Button>
          </Col>
          <Collapse isOpen={this.state.collapse}>
              <Card>
              <CardBody>
                <p>Anim pariatur cliche reprehenderit,
                enim eiusmod high life accusamus terry richardson ad squid. Nihil
                anim keffiyeh helvetica, craft beer labore wes anderson cred
                nesciunt sapiente ea proident.</p>
                <h2>first sub section</h2>
              </CardBody>
            </Card>
          </Collapse>
        </Row>
       </Container>
   );
 }
}

export default CollapseRow;
