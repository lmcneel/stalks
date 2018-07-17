import React, {Component} from 'react';
import {Card, CardText, CardBody, CardTitle, Col, Row, Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/fontawesome-free-solid';
// import API from '../../utils/API';


/**
 * Class FriendSearch
 * Component to serch for friends by name
 */
export class FriendSearch extends Component {
    /**
    *@param {*} props
    */
    constructor(props) {
        super(props);
    };

    /**
     * Mount Component
     */
    componentDidMount() {
        //
        /**
         * Query for friend search by name will go here!!!
         */
    };


/**
 * Render function for App Component
 * @return {JSX}
 *  Functon to Request a Freind will go here!!!
 */
    render() {
        return (

            <Card>
                <div onClick={this.props.toggleNav3}>
                <FontAwesomeIcon
    icon={faWindowClose} />
                </div>
                <CardBody>
                    <div>
                        <Row>
                            <Col sm="12">
                                <Card color="light">
                                    <CardBody>
                                        <CardTitle>
                                            Friend Search
                            </CardTitle>
                                        <CardText>
                                            <input placeholder="Friend User Name">
                                            </input>
                                            <Button>
                                                Search
                                        </Button>
                                        </CardText>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </CardBody>
            </Card>
        );
    }
};

