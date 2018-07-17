import React from 'react';
import {Progress} from 'reactstrap';
import PropTypes from 'prop-types';

const propTypes = {
  petStatColor: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
  petStatValue: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
  ]),
  petStatLabel: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
    PropTypes.string,
]),
};

const ProgressBars = (props) => {
  return (
    <span>
      <Progress color={props.petStatColor} value={props.petStatValue} className="barStyle"/>
      <div className="barstatlabel pb-2">{props.petStatLabel}</div>
    </span>
  );
};
ProgressBars.propTypes = propTypes;
export {ProgressBars};
