import React from 'react';
// import './Images.css';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
// import LinkButton from '/components/LinkButton'

// const Images = props => (
//   <div className="card" >
//     <div className="img-container">
//       <img alt={props.name} src={props.img} />
//       <p name={props.name}
//       />
//       <p title={props.title}
//       />
//       <p portfolio={props.portfolio}
//       />

//     </div>
//   </div>
// );

// export default Images;

// import React from 'react';


const Images = (props) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 pb-4 ">
      <div className="bg-light border rounded">
        <div className="img-container">
          <Card >
            <CardImg onClick={(event) => {
              console.log('Working');
            }} src={props.img} alt={props.name} />
            <CardBody>
              <CardTitle>{props.name}</CardTitle>
              <CardSubtitle>{props.title}</CardSubtitle>
              <Button>
                <a href={props.portfolio} target="_blank">Portfolio Link</a>
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
        );
      };
      export default Images;

