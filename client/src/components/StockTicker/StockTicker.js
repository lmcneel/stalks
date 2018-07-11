import React from 'react';
import './StockTicker.css';

const StockTicker = (props) => {
    return (
        <div className='stockticker'>
            <p>{props.text}</p>
        </div>
    );
};

export default StockTicker;
