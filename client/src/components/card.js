import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';

const UserCard = (props) => {
  return (
    <div style={{'width' : '25%'}} className='text-center'>
      <Card>
        <div style={{'display' : 'flex', 'justifyContent' : 'center', 'alignItems' : 'center'}}>
            <CardImg style={{'height' : '140px', 'width' : '140px'}} src='http://via.placeholder.com/140x140' alt='Card image cap' />
        </div>
        <CardBody>
          <CardTitle>Item x 0</CardTitle>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCard;