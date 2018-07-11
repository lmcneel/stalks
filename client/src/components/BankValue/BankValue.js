import React from 'react';

/** this is the small component on the petfolio page
 *  that shows the bank value
 */


const BankValue = (props) => {
  return (
    <div className="stockStats">
      <div>Bank Value</div>
      <div>{props.bankValue}</div>
    </div>
  );
};

export default BankValue;
