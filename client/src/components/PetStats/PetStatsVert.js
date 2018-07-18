import React from 'react';
// import { Container, Row, Col } from 'reactstrap';
import PetStatusBars from '../PetStats/PetStatusBars';
import PetPic from '../PetStats/PetPic';
import PetName from '../PetStats/PetName';

export const PetStatsVert = () => {
  return (
      <div className="bg-light border rounded pb-4 px-5">
        <div className="">
          <PetPic />
        </div>
        <div>
          <PetName />
        </div>
        <div>
          <PetStatusBars />
        </div>
      </div>
  );
};
