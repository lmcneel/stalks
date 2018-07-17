import React from 'react';
import {Card, CardImg, CardBody,
  CardTitle, Button} from 'reactstrap';
import './Card.css';
// import propTypes from 'prop-type';

// const propTypes = {
//   image: propTypes.STRING,
//   name: propTypes.STRING,
//   buyingItem: propTypes.STRING,
//   buttonName: propTypes.STRING
// }


const UserCard = (props) => {
  return (
    <div style={{'width': '25%', 'margin': '20px'}} className='text-center'>
      <Card style={{'display': 'flex'}} >
        <div style={{'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'}}>
            <CardImg style={{'height': '140px', 'width': '140px'}} src={props.image} alt='Card image cap' />
        </div>
        <CardBody>
          <CardTitle>{props.name}</CardTitle>
          <Button onClick ={props.buyingItem}>{props.buttonName}</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default UserCard;
