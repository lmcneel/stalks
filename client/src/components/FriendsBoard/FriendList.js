import React from 'react';
import {Card, CardBody, CardTitle, Col, Row} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faWindowClose} from '@fortawesome/fontawesome-free-solid';
// import API from '../../utils/API';


/**
 * Class FriendList
 * component to list current user friends on render
 */
export class FriendList extends React.Component {
    /**
    *@param {*} props
    */
    constructor(props) {
        console.log(props);
        super(props);
        console.log(props);
    };


    /**
     * Query for user friends will go here!!! from mysql
        showFriends = () => {
        API.whatgoeshere()
        .then(res => this.setState({whatgoeshere}))
        .catch(err => console.log(err));
     }
     */

    /**
    * Render function for App Component
    * @return {JSX}
    */
    render() {
        return (

            <Card>
                <div onClick={this.props.toggleNav1}>
                <FontAwesomeIcon
    icon={faWindowClose} />
                </div>
                <CardBody>
                    <div>

                        <Row>
                            <Col sm="12">
                                <Card color="light">
                                    <CardBody>
                                        <CardTitle>Friend List</CardTitle>
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

