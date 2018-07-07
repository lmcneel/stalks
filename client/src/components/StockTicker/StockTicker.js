import React from 'react';
import Marquee from 'react-text-marquee';
// import './StockTicker.css';

const StockTicker = (props) => {
    return (
        <div className='ticker'>
            <Marquee text={props.stockticker} loop={true} hoverToStop={true} />
        </div>
    );
};

export default StockTicker;
