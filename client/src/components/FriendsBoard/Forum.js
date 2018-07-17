import React, {Component} from 'react';
import {
    Card, CardBody,
    CardTitle, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row,
} from 'reactstrap';
import {ForumPostButton, ForumDeleteButton, ForumEditButton} from '../../components/FriendsBoard';
import API from '../../utils/API';

/**
 * Class Forum
 * Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
 */
export class Forum extends Component {
    /**
    *@param {*} props
    */
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            forum: {
                data: [{subject: '', comments: ''}],
            },
        };
        this.loadComments = this.loadComments.bind(this);
    }

    /**
     * Mount component, call load comments functions
     */
    componentDidMount() {
        this.loadComments();
    };

    /**
     * Functions will go here
     */
    loadComments() {
        API.getComments()
        /**
         * console.log("loadComments, Forum.js, res.data" + res.data)
         */
            .then((res) =>
                this.setState({
                    forum: res.data,

<<<<<<< HEAD
        }),
        // console.log(res.data)
=======
                }),
            // console.log(res.data)
>>>>>>> 47c9995ca76287993eb1400dc3dab6c6a93c2d1c
        )
            .catch((err) => console.log(err));
    };

    /**
     * Function(s)  to query fourms based on dropdown selection of (General, Stocks, or Help! categories) from mongoDB
     * Function to Post from input box into current Forum
     */


     /**
      * Toggle function for dropDown menu
      */
    toggle() {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }
        )
        );
    }

    /**
     * Render function for App Component
    * @return {JSX}
    */
    render() {
        return (

            <Container fluid id="Forum">
                <Row>
                    <Col sm="8" md={{size: 11, offset: 0}}>
                        <Card>
                            <CardTitle>
                                FORUM
                </CardTitle>
                            <div>
                                <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                    <DropdownToggle caret>
                                        Choose a Topic . . .
                            </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem>
                                            General
                                    </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            Stocks
                                    </DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>
                                            HELP!
                                    </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                            <div>
                                <Card>
                                    <CardBody>


<<<<<<< HEAD
                                                        <div>                                                                                      {this.state.forum.data.map((data, i) =>{
    return (<div key={`data${i}`}>
            <h2>{data.subject}<ForumEditButton/><ForumDeleteButton/></h2>
            <p>{data.comments}<ForumEditButton/><ForumDeleteButton/></p>
        </div>);
=======
    <div> {this.state.forum.data.map((data, i) =>{
    return (<Card key={`data${i}`}>
    <CardBody>
    <ForumEditButton/><ForumDeleteButton/>
            <th>{data.subject}</th>
            <tr>{data.comments}</tr>
    </CardBody>
        </Card>);
>>>>>>> 47c9995ca76287993eb1400dc3dab6c6a93c2d1c
})}
    </div>

<<<<<<< HEAD
                                                            </div>

=======
>>>>>>> 47c9995ca76287993eb1400dc3dab6c6a93c2d1c

                                    </CardBody>
                                </Card>
                            </div>
                            <ForumPostButton />
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Forum;
