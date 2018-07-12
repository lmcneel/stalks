
import React, {Component} from 'react';
import {Collapse, Button, CardBody, Card, Container, Row, Col, CardFooter} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/fontawesome-free-solid';
import RadioYesNo from '../RadioYesNo/index.js';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  collapse: PropTypes.bool,
  article: PropTypes.array,
};
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
       <Container className ='collapse-component'>
        <Row>
          <Col>
            <h1>{this.props.title}</h1>
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
              {this.props.article.map((article, i) =>
                  <div key={`article${i}`}>
                    <h3>{article.sub}</h3>
                    <p>{article.par}</p>
                  </div>
                )
                }
              </CardBody>
              <CardFooter className="text-center">
                <RadioYesNo />
              </CardFooter>
            </Card>
          </Collapse>
        </Row>
      </Container>
    );
  }
}
CollapseRow.propTypes = propTypes;
export default CollapseRow;
