import React from "react";
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, InputGroup, InputGroupAddon, InputGroupText, Input, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, Table } from 'reactstrap';


    export const Forum = (props) => {
        // isOpen={this.state.dropdownOpen} toggle={this.toggle}
    //   constructor(props) {
    //     super(props);
    
    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //       dropdownOpen: false
    //     };
    //   }
    
    //   toggle() {
    //     this.setState(prevState => ({
    //       dropdownOpen: !prevState.dropdownOpen
    //     }));
    //   }

     
        return (

<Container fluid>
    <Row>
        <Col sm="8">
            <Card>
                <CardTitle>
                    FORUM
                </CardTitle>
                    <div>
                        <Dropdown >
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
                        <Table>
                            <thead>
                                <tr>
                                    <th>
                                        POSTS
                                    </th>
                                </tr>
                            </thead>
                                <tbody>
                                    <tr>
                                    </tr> 
                                </tbody>
                        </Table>
                    </div>
                    <div>
                        <InputGroup>
                            <input>
                            </input>
                                <button>
                                    Post!
                                </button>
                        </InputGroup>
                        <br />   
                    </div>
            </Card>         
        </Col>
    </Row>
</Container>
)
};

