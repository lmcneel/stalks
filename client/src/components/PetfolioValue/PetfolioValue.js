import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    petfolioValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};
const PetfolioValue = (props) => (
    <div className="stockStats">
      <div className="">Petfolio Value</div>
      <div>{props.petfolioValue}</div>
    </div>
);

PetfolioValue.propTypes = propTypes;
export default PetfolioValue;
