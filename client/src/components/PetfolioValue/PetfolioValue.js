import React from 'react';

export const PetfolioValue = (props) => (
    <div className = {props.petfolioColor}>
      <div>Petfolio Value</div>
      <div>{props.petfolioValue}</div>
    </div>
);

export default PetfolioValue;
