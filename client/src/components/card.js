import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const UserCard = (props) => {
  return (
    <div style={{'width' : '25%'}} className='text-center'>
      <Card>
        <CardImg style={{'height' : '140px', 'width' : '140px', 'justifyContent' : 'center', 'alignItems' : 'center'}} src='http://via.placeholder.com/140x140' alt='Card image cap' />
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCard;