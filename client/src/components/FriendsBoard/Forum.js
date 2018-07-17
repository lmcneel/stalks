import React, {Component} from 'react';
import {
    Card, CardBody,
    CardTitle, Input, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, Table, Label, FormGroup,
} from 'reactstrap';
import API from '../../utils/API';


// Main Forum Component to allow messages to be viewed and posted by user. may allow for reply
export class Forum extends Component {
    constructor(props) {
        super(props);
        // Handles dropdown menu functionality
        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            forum: {
                data: [{subject: '', comments: ''}],
            },
        };
        this.loadComments = this.loadComments.bind(this);
    }

    componentDidMount() {
        this.loadComments();
    };

    // Functions will go here
    loadComments() {
        API.getComments()
        // console.log("loadComments, Forum.js, res.data" + res.data)
        .then((res) =>
        this.setState({
            forum: res.data,

        }),
        // console.log(res.data)
        )
            .catch((err) => console.log(err));
    };
    // Function(s)  to query fourms based on dropdown selection of (General, Stocks, or Help! categories) from mongoDB

    // Function to Post from input box into current Forum


    // Toggle function for dropDown menu
    toggle() {
        this.setState((prevState) => ({
            dropdownOpen: !prevState.dropdownOpen,
        }
        )
        );
    }

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
                                        <Table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        POSTS (WILL GO HERE IN THIS TABLE)
                                                        <div>                                                                                      {this.state.forum.data.map((data, i) =>{
    return (<div key={`id${i}`}>
            <h3>{data.subject}</h3>
            <p>{data.comments}</p>
        </div>);
})}

                                                            </div>
                                            </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                </tr>
                                            </tbody>
                                        </Table>

                                    </CardBody>
                                </Card>
                            </div>
                            <div>
                                <FormGroup>
                                    <Label for="exampleText">Text Area</Label>
                                    <Input type="textarea" name="text" id="exampleText" />
                                </FormGroup>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Forum;
