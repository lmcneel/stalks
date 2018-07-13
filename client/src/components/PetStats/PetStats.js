import React from 'react';
import {Progress} from 'reactstrap';

/** This component will create a status bar for the user's pet.
 *  The value for each must be obtained from the DB
 *  petStat = Overall Health, Happiness, Fondness, Hunger
 *  petStatColor = color of bar
 *  petStatValue = % filled
 */

 // ============================================================

let hunger;

const hungerDrain = () => {

// Drain hunger based on a time interval.
// The drain will take effect upon login.
// To calculate the amount of drain we will use the last time they logged in as a time stamp and subtract that from their current login then drain the hunger appropriately.
// 24 hours until your pet food reaches 0
// (Last login timestamp) - (Current login timestamp) = (Hunger drain)


}

const hungerFill = () => {

// Feeding your pet is how you will increase the hunger bar (meaning it will not need food for a while)
// You can buy the food using in game currency in the shop, you can only own so much food at a time.


}

 // ============================================================

export const PetStats = (props) => {
  return (
    <div>
      <Progress color={props.petStatColor} value={props.petStatValue} />
      <div className="barstatlabel">{props.petStat}</div>
    </div>
  );
};

