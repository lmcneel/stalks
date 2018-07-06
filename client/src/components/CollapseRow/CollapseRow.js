
import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, Container, Row, Col } from 'reactstrap';






class CollapseRow extends Component {
 constructor(props) {
   super(props);
   this.toggle = this.toggle.bind(this);
   this.state = { collapse: false };
 }
 

 toggle() {
   this.setState({ collapse: !this.state.collapse });
 }
 

 render() {
   return (
     <div>
       <Container>
       <style jsx>{`
          .left {
            float: left;
            text-align: left;
          }
          `}
          </style>
        <Row>
          <Col>
          <h1 className = "left">Pets Help Center</h1>
          </Col>

          <Col>

       <Button color="primary" className="buttonCol" onClick={this.toggle} style={{ marginBottom: '1rem' }}><i className = {'fa fa-plus'} /></Button>
       <style jsx>{`
        .buttonCol {
          background-color: unset;
          border: none;
          color: black;
          float: right;
          
        }
      `}
      </style>

       </Col>
       <Collapse isOpen={this.state.collapse}>
         <Card>
           

           <CardBody>
           <p className = 'left'>Anim pariatur cliche reprehenderit,
            enim eiusmod high life accusamus terry richardson ad squid. Nihil
            anim keffiyeh helvetica, craft beer labore wes anderson cred
            nesciunt sapiente ea proident.</p>
            <h2 className ='left'>first sub section
            </h2>
           </CardBody>
         </Card>
       </Collapse>
       </Row>
       
       </Container>
     </div>
   );
 }
}

export default CollapseRow;