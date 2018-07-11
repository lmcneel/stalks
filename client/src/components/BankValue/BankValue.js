import React from 'react';
import PropTypes from 'prop-types';

/** this is the small component on the petfolio page
 *  that shows the bank value
 */

const propTypes = {
    bankValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
};

const BankValue = (props) => {
  return (
    <div className="stockStats">
      <div>Bank Value</div>
      <div>{props.bankValue}</div>
    </div>
  );
};

BankValue.propTypes = propTypes;
export default BankValue;
