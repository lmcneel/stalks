import React from 'react';

/** this is the small component on the petfolio page
 *  that shows the bank value
 */


const BankValue = (props) => {
  return (
    <div>
      <div className="">Bank Value</div>
      <div>{props.bankValue}</div>
    </div>
  );
};

export default BankValue;
