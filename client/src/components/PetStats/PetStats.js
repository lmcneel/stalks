import React from 'react';
import {Progress} from 'reactstrap';

/** This component will create a status bar for the user's pet.
 *  The value for each must be obtained from the DB
 *  petStat = Overall Health, Happiness, Fondness, Hunger
 *  petStatColor = color of bar
 *  petStatValue = % filled
 */

export const PetStats = (props) => {
  return (
    <div>
      <Progress color={props.petStatColor} value={props.petStatValue} />
      <div className="barstatlabel">{props.petStat}</div>
    </div>
  );
};

