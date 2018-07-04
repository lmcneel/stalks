import React from 'react';
import { Progress } from 'reactstrap';

/** This component will create a status bar for the user's pet.
 *  The value for each must be obtained from the DB, the var names revised.
 *  petStat = [Overall Health, Happiness, Fondness, Hunger]
 *  Styling TBD to match app styles
 */
 

const PetStats = (props) => {
  return (
    <div>
      <div className="text-left">{props.petStat}</div>
      <Progress color={props.petStatColor} value={props.petStatValue} />      
    </div>
  );
};

export default PetStats;