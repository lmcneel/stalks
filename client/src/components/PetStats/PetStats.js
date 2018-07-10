import React from 'react';
import {Progress} from 'reactstrap';
import PropTypes from 'prop-types';

/** This component will create a status bar for the user's pet.
 *  The value for each must be obtained from the DB
 *  petStat = Overall Health, Happiness, Fondness, Hunger
 *  petStatColor = color of bar
 *  petStatValue = % filled
 */
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
  petStat: PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.element,
  PropTypes.string,
  ]),
};
const PetStats = (props) => {
  return (
    <div>
      <Progress color={props.petStatColor} value={props.petStatValue} />
      <div className="barstatlabel">{props.petStat}</div>
    </div>
  );
};
PetStats.propTypes = propTypes;
export {PetStats};
