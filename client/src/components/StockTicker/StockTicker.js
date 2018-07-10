import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    text: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element,
        PropTypes.string,
    ]),
};
const StockTicker = (props) => {
    return (
        <div className='stockticker'>
            <p>{props.text}</p>
        </div>
    );
};
StockTicker.propTypes = propTypes;
export default StockTicker;
