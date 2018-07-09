import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const UserCard = (props) => {
  return (
    <div style={{'width' : '25%'}} className='text-center'>
      <Card>
        <CardImg style={{'height' : '140px', 'width' : '140px', 'margin-left' : '33%', 'margin-right' : '33%'}} src='http://via.placeholder.com/140x140' alt='Card image cap' />
        <CardBody>
          <CardTitle>Item x 0</CardTitle>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCard;