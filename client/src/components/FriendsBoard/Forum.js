import React, {Component} from 'react';
import { Card, CardText, CardBody,
    CardTitle, CardSubtitle, InputGroup, InputGroupAddon, InputGroupText, Input, Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Row, Table } from 'reactstrap';


    export class Forum extends Component {
        constructor(props) {
            super(props);
        
            this.toggle = this.toggle.bind(this);
            this.state = {
              dropdownOpen: false
            };
          }
        
          toggle() {
            this.setState(prevState => ({
              dropdownOpen: !prevState.dropdownOpen
            }));
          }
     render(){
        return (

<Container fluid id="Forum">
    <Row>
        <Col sm="8" md={{ size: 11, offset: 0 }}>
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
}
    };

