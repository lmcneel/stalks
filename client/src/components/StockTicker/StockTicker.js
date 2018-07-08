import React from 'react';
import './StockTicker.css';

const StockTicker = (props) => {
    return (
        <div className='scroll-left'>
            <p>{props.stockticker}</p>
        </div>
    );
};

export default StockTicker;
