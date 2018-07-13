import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  petStatValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
]),
};

const ProgressBars2 = (props) => {
  return (
    <div>
      <div>{props.petStatValue}</div>
    </div>
  );
};
ProgressBars2.propTypes = propTypes;
export {ProgressBars2};
